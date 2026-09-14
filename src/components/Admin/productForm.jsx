"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Upload, X, Save, ArrowLeft } from "lucide-react";
import axios from "axios";

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  padding: ${(props) =>
    props.size === "sm" ? "0.375rem 0.75rem" : "0.5rem 1rem"};
  transition: all 0.2s;
  cursor: pointer;
  width: ${(props) => (props.$fullWidth ? "100%" : "auto")};

  ${(props) =>
    props.variant === "outline"
      ? `
      background-color: transparent;
      border: 1px solid ${props.theme.borderColor};
      color: ${props.theme.text};
      
      &:hover {
        background-color: ${props.theme.hoverBackground};
      }
    `
      : props.variant === "ghost"
      ? `
      background-color: transparent;
      border: none;
      color: ${props.theme.text};
      
      &:hover {
        background-color: ${props.theme.hoverBackground};
      }
    `
      : props.variant === "destructive"
      ? `
      background-color: #ef4444;
      border: none;
      color: white;
      
      &:hover {
        background-color: #dc2626;
      }
    `
      : `
      background-color: ${props.theme.primary};
      border: none;
      color: white;
      
      &:hover {
        background-color: ${props.theme.primaryHover};
      }
    `}
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.inputBackground};
  color: ${(props) => props.theme.text};
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.primary};
    box-shadow: 0 0 0 1px ${(props) => props.theme.primary};
  }
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.inputBackground};
  color: ${(props) => props.theme.text};
  font-size: 0.875rem;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.primary};
    box-shadow: 0 0 0 1px ${(props) => props.theme.primary};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.inputBackground};
  color: ${(props) => props.theme.text};
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.primary};
    box-shadow: 0 0 0 1px ${(props) => props.theme.primary};
  }
`;

const Card = styled.div`
  background-color: ${(props) => props.theme.cardBackground};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 0.5rem;
  overflow: hidden;
`;

const CardHeader = styled.div`
  padding: 1.5rem 1.5rem 0;
`;

const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const CardDescription = styled.p`
  font-size: 0.875rem;
  color: ${(props) => props.theme.textSecondary};
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid ${(props) => props.theme.borderColor};
  display: flex;
  justify-content: flex-end;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const RadioItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Radio = styled.input.attrs({ type: "radio" })`
  width: 1rem;
  height: 1rem;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 1rem;
  height: 1rem;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

const FormSection = styled(Card)`
  background-color: ${(props) => props.theme.cardBackground};
  border: 1px solid ${(props) => props.theme.borderColor};
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const ImageUploadContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ImageUploadBox = styled.div`
  position: relative;
  aspect-ratio: 1;
  border: 2px dashed ${(props) => props.theme.borderColor};
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${(props) => props.theme.backgroundAlt};

  &:hover {
    border-color: ${(props) => props.theme.primary};
    background-color: ${(props) => props.theme.hoverBackground};
  }
`;

const ImagePreview = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: 0.5rem;
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.borderColor};
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 9999px;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.primary};
    color: white;
  }
`;

const SizeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(8, 1fr);
  }
`;

const SizeCheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${(props) => props.theme.inputBackground};

  &:hover {
    background-color: ${(props) => props.theme.hoverBackground};
  }

  &[data-checked="true"] {
    background-color: ${(props) => props.theme.primary + "20"};
    border-color: ${(props) => props.theme.primary};
  }
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    price: "",
    description: "",
    category_id: "",
    status: "disponible",
    sizes: [],
    images: [],
    newImages: [],
    removedImages: [],
    featured: false,
  });

  const [categories, setCategories] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [loading, setLoading] = useState(isEditing);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesRes = await axios.get(
          "http://localhost:8000/api/categories"
        );
        setCategories(categoriesRes.data);

        const sizesRes = await axios.get("http://localhost:8000/api/sizes");
        setAvailableSizes(sizesRes.data);

        if (isEditing) {
          try {
            const productRes = await axios.get(
              `http://localhost:8000/api/admin/products/${id}`
            );
            const productData = productRes.data.data;
            setFormData({
              id: productData.id || null,
              name: productData.name || "",
              price: productData.price || "",
              description: productData.description || "",
              category_id: productData.category_id || "",
              status: productData.status || "disponible",
              sizes: productData.sizes
                ? productData.sizes.map((size) => size.id)
                : [],
              images: productData.images
                ? productData.images.map((img) => img.image_url)
                : [],
              newImages: [],
              removedImages: [],
              featured: productData.featured || false,
            });
          } catch (err) {
            console.error(err);
            setError("Produit non trouvé. Veuillez vérifier l'ID du produit.");
          }
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Erreur lors du chargement des données. Veuillez réessayer.");
        setLoading(false);
      }
    };

    fetchData();
  }, [isEditing, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleStatusChange = (e) => {
    setFormData({
      ...formData,
      status: e.target.value,
    });
  };

  const handleFeaturedChange = (e) => {
    setFormData({
      ...formData,
      featured: e.target.checked,
    });
  };

  const handleSizeToggle = (sizeId) => {
    const newSizes = formData.sizes.includes(sizeId)
      ? formData.sizes.filter((s) => s !== sizeId)
      : [...formData.sizes, sizeId];
    setFormData({ ...formData, sizes: newSizes });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      newImages: [...formData.newImages, ...files],
    });
  };

  const removeImage = (index, isNewImage = false) => {
    if (isNewImage) {
      const newImages = [...formData.newImages];
      newImages.splice(index, 1);
      setFormData({ ...formData, newImages });
    } else {
      const images = [...formData.images];
      const removedImage = images.splice(index, 1)[0];
      setFormData({
        ...formData,
        images,
        removedImages: [...formData.removedImages, removedImage],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name) {
      setError("Le nom du produit est requis.");
      return;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      setError("Le prix doit être un nombre positif.");
      return;
    }
    if (!formData.status) {
      setError("Le statut du produit est requis.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name || "");
    data.append("price", formData.price || 0);
    data.append("description", formData.description || "");
    data.append("category_id", formData.category_id || "");
    data.append("status", formData.status || "disponible");
    data.append("featured", formData.featured ? "1" : "0");

    if (formData.sizes.length > 0) {
      formData.sizes.forEach((sizeId, index) => {
        data.append(`sizes[${index}]`, sizeId);
      });
    }

    formData.newImages.forEach((image, index) => {
      data.append(`images[${index}]`, image);
    });

    if (isEditing && formData.removedImages.length > 0) {
      formData.removedImages.forEach((image, index) => {
        data.append(`removed_images[${index}]`, image);
      });
    }

    try {
      let response;
      if (formData.id) {
        response = await axios.post(
          `http://localhost:8000/api/admin/products/${id}?_method=PUT`,
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        response = await axios.post(
          "http://localhost:8000/api/admin/products",
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      }

      navigate("/admin/products");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          (error.response?.data?.errors
            ? Object.entries(error.response.data.errors)
                .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
                .join("; ")
            : "Erreur lors de l'enregistrement du produit. Veuillez réessayer.")
      );
    }
  };

  if (loading) {
    return <div className="text-center p-8">Chargement des données...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-500">
        {error}
        <Button
          onClick={() => {
            setError(null);
            if (isEditing) {
              navigate("/admin/products");
            }
          }}
          variant="outline"
          className="mt-4"
        >
          {isEditing ? "Retour à la liste" : "Réessayer"}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <ActionBar>
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/admin/products")}
        >
          <ArrowLeft size={16} style={{ marginRight: "8px" }} />
          Retour aux Produits
        </Button>
        <Button type="submit">
          <Save size={16} style={{ marginRight: "8px" }} />
          {isEditing ? "Mettre à jour le Produit" : "Enregistrer le Produit"}
        </Button>
      </ActionBar>

      <FormContainer>
        <FormSection>
          <CardHeader>
            <CardTitle>Informations du Produit</CardTitle>
            <CardDescription>
              Entrez les détails de base du produit.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormGroup>
              <Label htmlFor="name">Nom du Produit</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Entrez le nom du produit"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="price">Prix (MAD)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Entrez la description du produit"
                rows={4}
              />
            </FormGroup>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <FormGroup>
                <Label htmlFor="category_id">Catégorie</Label>
                <Select
                  id="category_id"
                  name="category_id"
                  value={formData.category_id}
                  onChange={(e) =>
                    setFormData({ ...formData, category_id: e.target.value })
                  }
                >
                  <option value="">Aucune catégorie</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Statut</Label>
                <RadioGroup>
                  <RadioItem>
                    <Radio
                      id="disponible"
                      name="status"
                      value="disponible"
                      checked={formData.status === "disponible"}
                      onChange={handleStatusChange}
                    />
                    <Label htmlFor="disponible" style={{ margin: 0 }}>
                      Disponible
                    </Label>
                  </RadioItem>
                  <RadioItem>
                    <Radio
                      id="indisponible"
                      name="status"
                      value="indisponible"
                      checked={formData.status === "indisponible"}
                      onChange={handleStatusChange}
                    />
                    <Label htmlFor="indisponible" style={{ margin: 0 }}>
                      Non Disponible
                    </Label>
                  </RadioItem>
                </RadioGroup>
              </FormGroup>
            </div>

            <FormGroup>
              <Label htmlFor="featured">Produit en vedette</Label>
              <Checkbox
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleFeaturedChange}
              />
            </FormGroup>
          </CardContent>
        </FormSection>

        <FormSection>
          <CardHeader>
            <CardTitle>Tailles Disponibles</CardTitle>
            <CardDescription>
              Sélectionnez toutes les tailles disponibles pour ce produit.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SizeGrid>
              {availableSizes.map((size) => (
                <SizeCheckboxWrapper
                  key={size.id}
                  onClick={() => handleSizeToggle(size.id)}
                  data-checked={formData.sizes.includes(size.id)}
                >
                  <Checkbox
                    id={`size-${size.id}`}
                    checked={formData.sizes.includes(size.id)}
                    onChange={() => handleSizeToggle(size.id)}
                  />
                  <label
                    htmlFor={`size-${size.id}`}
                    style={{ fontSize: "0.875rem" }}
                  >
                    {size.size}
                  </label>
                </SizeCheckboxWrapper>
              ))}
            </SizeGrid>
          </CardContent>
        </FormSection>

        <FormSection>
          <CardHeader>
            <CardTitle>Images du Produit</CardTitle>
            <CardDescription>
              Téléchargez des images du produit. Vous pouvez ajouter jusqu'à 5
              images.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ImageUploadContainer>
              {formData.images.map((image, index) => (
                <ImagePreview key={`existing-${index}`}>
                  <PreviewImage
                    src={`http://localhost:8000/storage/${image}`}
                    alt={`Produit ${index + 1}`}
                    onError={(e) =>
                      (e.target.src = "/placeholder.svg?height=200&width=200")
                    }
                  />
                  <RemoveImageButton onClick={() => removeImage(index, false)}>
                    <X size={12} />
                  </RemoveImageButton>
                </ImagePreview>
              ))}

              {formData.newImages.map((image, index) => (
                <ImagePreview key={`new-${index}`}>
                  <PreviewImage
                    src={URL.createObjectURL(image)}
                    alt={`Nouveau produit ${index + 1}`}
                  />
                  <RemoveImageButton onClick={() => removeImage(index, true)}>
                    <X size={12} />
                  </RemoveImageButton>
                </ImagePreview>
              ))}

              {formData.images.length + formData.newImages.length < 5 && (
                <ImageUploadBox as="label" htmlFor="image-upload">
                  <Upload size={24} />
                  <span style={{ marginTop: "0.5rem", fontSize: "0.875rem" }}>
                    Télécharger une Image
                  </span>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                    multiple
                  />
                </ImageUploadBox>
              )}
            </ImageUploadContainer>
          </CardContent>
        </FormSection>

        <CardFooter>
          <Button type="submit">
            <Save size={16} style={{ marginRight: "8px" }} />
            {isEditing ? "Mettre à jour le Produit" : "Enregistrer le Produit"}
          </Button>
        </CardFooter>
      </FormContainer>
    </form>
  );
};

export default ProductForm;
