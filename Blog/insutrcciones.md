# API de Blog - Relaciones entre Entidades



## 📊 Modelo de Datos

### Entidades y sus Relaciones

**Posts**
```
- id (PK)
- title (String, max 200)
- content (Text)
- author_id (FK)
- status (enum: draft, published, archived)
- published_at (Timestamp, nullable)
- created_at, updated_at
```

**Categories**
```
- id (PK)
- name (String, max 100, unique)
- slug (String, max 120, unique)
- description (Text, nullable)
- parent_id (FK a Categories, nullable)
- created_at
```

**Tags**
```
- id (PK)
- name (String, max 50, unique)
- slug (String, max 60, unique)
- created_at
```

**Comments**
```
- id (PK)
- post_id (FK a Posts)
- author_id (FK)
- content (Text, max 1000)
- parent_id (FK a Comments, nullable)
- status (enum: pending, approved, rejected)
- created_at
```

**post_categories** (Tabla Pivote)
```
- post_id (FK)
- category_id (FK)
- PRIMARY KEY (post_id, category_id)
```

**post_tags** (Tabla Pivote)
```
- post_id (FK)
- tag_id (FK)
- PRIMARY KEY (post_id, tag_id)
```

---

## 🎯 Tipos de Relaciones a Implementar

### 1. One-to-Many
- **Posts → Comments**: Un post tiene muchos comentarios
- **Categories → Subcategories**: Una categoría puede tener subcategorías (self-reference)
- **Comments → Replies**: Un comentario puede tener respuestas (self-reference)

### 2. Many-to-Many
- **Posts ↔ Categories**: Un post puede tener múltiples categorías, una categoría puede tener múltiples posts
- **Posts ↔ Tags**: Un post puede tener múltiples tags, un tag puede estar en múltiples posts

---

## 🔧 Endpoints Requeridos

### Posts
```
POST   /api/posts
  Body: {
    "title": "string",
    "content": "string",
    "status": "draft|published|archived",
    "category_ids": [1, 2],
    "tags": ["nodejs", "api"]
  }

GET    /api/posts/:id
  Response debe incluir: categories, tags, comments_count

PUT    /api/posts/:id
  Permite actualizar categories y tags

DELETE /api/posts/:id
```

### Categorías
```
POST   /api/categories
  Body: {
    "name": "string",
    "description": "string",
    "parent_id": 1 (opcional)
  }

GET    /api/categories/:id
  Response debe incluir: posts_count, subcategories

DELETE /api/categories/:id
```

### Tags
```
POST   /api/tags
  Body: { "name": "string" }

GET    /api/tags/:id
  Response debe incluir: posts_count

DELETE /api/tags/:id
```

### Comentarios
```
POST   /api/posts/:postId/comments
  Body: {
    "content": "string",
    "parent_id": 1 (opcional para respuestas)
  }

GET    /api/posts/:postId/comments
  Response debe incluir comentarios con sus respuestas anidadas

PATCH  /api/comments/:id/status
  Body: { "status": "approved|rejected" }
```

---

## 📋 Reglas de Negocio

### Posts
- ✅ Un post debe tener **mínimo 1 y máximo 3 categorías**
- ✅ Un post puede tener **máximo 10 tags**
- ✅ Al asignar tags que no existen, **créalos automáticamente**
- ✅ Al eliminar un post, **eliminar sus relaciones** en tablas pivote
- ✅ Al eliminar un post, **eliminar sus comentarios**

### Categorías
- ✅ El **slug se genera automáticamente** del name (ej: "Mi Categoría" → "mi-categoria")
- ✅ Solo se permite **1 nivel de jerarquía** (categoría → subcategoría)
- ✅ **No se puede eliminar** una categoría si:
  - Tiene posts asociados
  - Tiene subcategorías
- ✅ Al consultar posts de una categoría padre, **incluir posts de subcategorías**

### Tags
- ✅ El **slug se genera automáticamente** del name
- ✅ Se puede eliminar un tag aunque tenga posts (solo elimina la relación)

### Comentarios
- ✅ Solo se puede comentar en posts con status **"published"**
- ✅ Los comentarios nuevos tienen status **"pending"** por defecto
- ✅ Solo **1 nivel de anidación** (comentario → respuesta, no más niveles)
- ✅ No se puede responder a un comentario que ya es una respuesta
- ✅ Al eliminar un comentario padre, **eliminar sus respuestas**

---

## ✅ Casos de Prueba Obligatorios

Debes probar y validar estos escenarios:

1. ❌ Crear un post con `category_ids` que no existen → debe fallar
2. ✅ Crear un post con tags nuevos → debe crearlos automáticamente
3. ❌ Asignar 4 categorías a un post → debe fallar
4. ❌ Asignar 11 tags a un post → debe fallar
5. ❌ Eliminar una categoría que tiene posts → debe fallar
6. ❌ Eliminar una categoría que tiene subcategorías → debe fallar
7. ✅ Eliminar un tag que tiene posts → debe permitirlo
8. ❌ Comentar en un post con status "draft" → debe fallar
9. ❌ Responder a un comentario que ya es respuesta → debe fallar
10. ✅ Al eliminar un post, verificar que se eliminan sus comentarios
11. ✅ Al eliminar un comentario padre, verificar que se eliminan las respuestas
12. ✅ Obtener posts de una categoría padre debe incluir posts de subcategorías

---

## 📦 Entregables

### 1. Base de Datos
- Migración con todas las tablas y relaciones
- Foreign keys correctamente configuradas
- Índices en:
  - `posts.status`
  - `categories.slug`
  - `tags.slug`
  - `comments.post_id`
  - `post_categories(post_id, category_id)`
  - `post_tags(post_id, tag_id)`

### 2. API
- Todos los endpoints funcionando
- Validaciones implementadas según reglas de negocio
- Respuestas con las relaciones incluidas donde corresponde

### 3. Seeds
- Al menos 20 posts
- 5 categorías (incluir 2 subcategorías)
- 15 tags
- 30 comentarios (incluir respuestas)

---

## 🎯 Criterios de Éxito

Tu ejercicio estará completo cuando:

- [ ] Todas las relaciones están correctamente implementadas (FK, tablas pivote)
- [ ] Los 12 casos de prueba funcionan como se espera
- [ ] Las validaciones de límites funcionan (3 categorías max, 10 tags max)
- [ ] Los slugs se generan automáticamente
- [ ] No se puede eliminar categorías con dependencias
- [ ] El sistema de jerarquía funciona (1 nivel)
- [ ] Los comentarios anidados funcionan (1 nivel)
- [ ] Las eliminaciones en cascada funcionan correctamente
- [ ] Las respuestas incluyen las relaciones correctamente cargadas

---

## 🚀 Stack Sugerido

- **Node.js** + Express/Fastify
- **PostgreSQL** / MySQL
- **ORM**: Sequelize / TypeORM / Prisma
- **Validación**: Joi / Zod / express-validator

---

**Tiempo estimado:** 6-8 horas
