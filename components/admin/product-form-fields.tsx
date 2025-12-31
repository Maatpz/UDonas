"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { CATEGORY_OPTIONS } from "./category-filter"

interface FormData {
  name: string
  price: string
  image_url: string
  description: string
  category: string
  active: boolean
  sizes: string[]
  colors: string[]
  shopee_url: string 
}

interface ProductFormFieldsProps {
  formData: FormData
  setFormData: (data: FormData) => void
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  uploadingImage: boolean
  colorInput: string
  setColorInput: (value: string) => void
  handleSizeSelect: (size: string) => void
  removeSize: (size: string) => void
  addColor: () => void
  removeColor: (color: string) => void
}

export function ProductFormFields({
  formData,
  setFormData,
  handleImageUpload,
  uploadingImage,
  colorInput,
  setColorInput,
  handleSizeSelect,
  removeSize,
  addColor,
  removeColor,
}: ProductFormFieldsProps) {
  return (
    <>
      {/* Campos do formulário de produto */}
      <div className="space-y-2">
        <Label htmlFor="name">Nome do Produto</Label>
        <Input
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Categoria</Label>
        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORY_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Preço (R$)</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          required
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Imagem</Label>
        <div className="flex gap-2">
          <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} />
        </div>
        <div className="text-sm text-gray-600">Ou use uma URL de imagem:</div>
        <Input
          placeholder="https://exemplo.com/imagem.jpg"
          value={formData.image_url}
          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
        />
        {formData.image_url && (
          <img
            src={formData.image_url || "/placeholder.svg"}
            alt="Preview"
            className="w-full h-32 object-cover rounded"
          />
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="active">Status</Label>
        <Select
          value={formData.active ? "ativo" : "inativo"}
          onValueChange={(value) => setFormData({ ...formData, active: value === "ativo" })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione um status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ativo">Ativo</SelectItem>
            <SelectItem value="inativo">Inativo</SelectItem>
          </SelectContent>
        </Select>
      </div>

     
      <div className="space-y-2">
        <Label>Tamanhos Disponíveis</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {["P", "M", "G", "GG", "Único"].map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => handleSizeSelect(size)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                formData.sizes.includes(size)
                  ? "bg-violet-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.sizes.map((size) => (
            <div
              key={size}
              className="bg-violet-100 text-violet-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              {size}
              <button type="button" onClick={() => removeSize(size)} className="hover:text-violet-600">
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      
      <div className="space-y-2">
        <Label>Cores Disponíveis</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Ex: Preto, Azul, Rosa..."
            value={colorInput}
            onChange={(e) => setColorInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addColor()
              }
            }}
          />
          <Button type="button" onClick={addColor} variant="outline">
            Adicionar
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.colors.map((color) => (
            <div
              key={color}
              className="bg-violet-100 text-violet-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              {color}
              <button type="button" onClick={() => removeColor(color)} className="hover:text-violet-600">
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="shopee_url">Link da Shopee (Opcional)</Label>
        <Input
          id="shopee_url"
          type="url"
          placeholder="https://shopee.com.br/produto..."
          value={formData.shopee_url}
          onChange={(e) => setFormData({ ...formData, shopee_url: e.target.value })}
        />
        <p className="text-xs text-gray-500">
          Se o produto também estiver disponível na Shopee, cole o link aqui para exibir o botão na landing page.
        </p>
      </div>
    </>
  )
}
