/**
 * Antares · Types partagés
 * Schéma Drizzle/Payload simplifié. À étendre côté backend.
 */

export type Role = 'admin' | 'editor' | 'contributor';
export type ArticleStatus = 'draft' | 'review' | 'published' | 'scheduled' | 'archived';
export type ArticleType = 'decryptage' | 'alerte' | 'actualite' | 'analyse' | 'tribune';
export type BookingStatus = 'scheduled' | 'completed' | 'cancelled' | 'no_show';
export type BookingLocation = 'visio' | 'paris' | 'massy' | 'nice';
export type ApplicationStatus = 'new' | 'reviewing' | 'interview' | 'rejected' | 'hired' | 'archived';

export interface Avocat {
  id: string;
  slug: string;
  firstName: string;
  lastName: string;
  role: string;
  photo: string | null;
  email: string;
  phone: string | null;
  calendlyUrl: string | null;
  barAdmissionYear: number;
  bioShort: string;
  bioLong: string; // Lexical JSON serialized
  expertises: Expertise[];
  languages: string[];
  publicationsCount: number;
  orderIndex: number;
  isPartner: boolean;
  isPublished: boolean;
}

export interface Expertise {
  id: string;
  slug: string;
  name: string;
  icon: string | null;
  lede: string;
  body: string; // Lexical JSON
  relatedAvocats: Avocat[];
  orderIndex: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  type: ArticleType;
  coverImage: string | null;
  authors: Avocat[];
  expertise: Expertise;
  tags: string[];
  lede: string;
  body: string; // Lexical JSON
  status: ArticleStatus;
  reviewerId: string | null;
  publishedAt: Date | null;
  scheduledAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  seoTitle: string;
  seoDescription: string;
  viewCount: number;
  readingTime: number;
}

export interface Booking {
  id: string;
  calendlyEventUri: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string | null;
  clientCompany: string | null;
  scheduledAt: Date;
  durationMinutes: number;
  avocat: Avocat;
  expertiseLabel: string;
  location: BookingLocation;
  status: BookingStatus;
  notes: string | null;
  subjectShort: string;
  createdAt: Date;
}

export interface JobApplication {
  id: string;
  ref: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  desiredRole: string;
  targetExpertise: Expertise;
  coverLetter: string;
  cvUrl: string;
  cvFilename: string;
  linkedinUrl: string | null;
  status: ApplicationStatus;
  assignedTo: string | null;
  internalNotes: ApplicationNote[];
  yearsExperience: number;
  previousFirm: string | null;
  source: string;
  sourceIp: string;
  createdAt: Date;
}

export interface ApplicationNote {
  id: string;
  authorId: string;
  authorName: string;
  authorInitials: string;
  body: string;
  isSystem: boolean;
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  avocatId: string | null;
  notificationPreferences: NotificationPreferences;
  mfaEnabled: boolean;
  lastLoginAt: Date | null;
}

export interface NotificationPreferences {
  bookingNew: boolean;
  bookingCancelled: boolean;
  bookingReminder24h: boolean;
  articlePublished: boolean;
  reviewRequest: boolean;
  commentMention: boolean;
  applicationNew: boolean;
  applicationAssigned: boolean;
  weeklyDigest: boolean;
  newsletterBcc: boolean;
}

export interface MediaAsset {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  width: number;
  height: number;
  bytes: number;
  sha256: string;
  uploadedBy: string;
  usedIn: { type: 'article' | 'avocat' | 'page'; ref: string; label: string }[];
  uploadedAt: Date;
}
