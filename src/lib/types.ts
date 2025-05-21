// Типы для праздников
export interface Holiday {
  id: string
  date: Date
  name: string
  description?: string
  type: "national" | "international" | "religious" | "professional" | "custom"
  icon?: string
}

// Типы для пользовательских дат
export interface UserDate {
  id: string
  userId: string
  date: Date
  name: string
  description?: string
  type: "birthday" | "anniversary" | "reminder" | "other"
  icon?: string
}

// Типы для открыток
export interface Postcard {
  id: string
  holidayId?: string
  userDateId?: string
  imageUrl: string
  title: string
  description?: string
  tags: string[]
}

// Типы для поздравлений
export interface Greeting {
  id: string
  holidayId?: string
  userDateId?: string
  text: string
  author?: string
  tags: string[]
}

// Типы для пользователей
export interface User {
  id: string
  email: string
  name?: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

// Типы для истории пользователя
export interface UserHistory {
  id: string
  userId: string
  action: "view" | "create" | "update" | "delete" | "share"
  entityType: "holiday" | "userDate" | "postcard" | "greeting"
  entityId: string
  createdAt: Date
}

// Типы для модерации
export interface Moderation {
  id: string
  entityType: "userDate" | "greeting"
  entityId: string
  status: "pending" | "approved" | "rejected"
  reason?: string
  moderatorId?: string
  createdAt: Date
  updatedAt: Date
}
