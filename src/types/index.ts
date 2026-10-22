import { z } from 'zod'

// ── Appointment Form Schema ──────────────────────────────
export const appointmentSchema = z.object({
  patientName: z.string().min(2, 'Full name must be at least 2 characters'),
  email:       z.string().email('Please enter a valid email address'),
  phone:       z.string().min(10, 'Please enter a valid phone number (at least 10 digits)'),
  service:     z.string().min(1, 'Please select a service'),
  date:        z.string().min(1, 'Please select a date'),
  timeSlot:    z.string().min(1, 'Please select a time slot'),
  message:     z.string().optional(),
})

export type AppointmentFormData = z.infer<typeof appointmentSchema>

// ── Service Type ─────────────────────────────────────────
export interface Service {
  id:          string
  name:        string
  description: string
  icon:        string
  duration:    string
  active:      boolean
}

// ── Appointment Type ──────────────────────────────────────
export interface Appointment {
  id:          string
  patientName: string
  email:       string
  phone:       string
  service:     string
  date:        Date
  timeSlot:    string
  message?:    string | null
  status:      'PENDING' | 'CONFIRMED' | 'CANCELLED'
  createdAt:   Date
}

// ── Nav Link Type ─────────────────────────────────────────
export interface NavLink {
  label: string
  href:  string
}
