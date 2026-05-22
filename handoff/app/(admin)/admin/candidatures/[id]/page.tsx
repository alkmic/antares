/**
 * /admin/candidatures/[id] — détail candidature.
 *
 * DESIGN INTENT
 *   - Head card · grand avatar 80px + nom Fraunces 38px italique + meta + select statut grand pill
 *   - Actions bar · Convoquer (primary + pill "+ envoie email") · Répondre · Affecter · Refuser (danger) · Archiver
 *   - Grid 1fr + 380px
 *   - Col gauche : Infos KV (10 lignes) · Lettre Fraunces drop cap + italiques · Timeline notes (humain + system ink/or)
 *   - Col droite : preview PDF embed CV (header avec PDF pill rouge · page rendu · footer "Page 1/2 · 1,2 Mo · Cloudflare R2")
 *   - Statut éditable : new / reviewing / interview / rejected / hired / archived
 */
import { notFound } from 'next/navigation';
import { AdminLayout, AdminPageHead, Italic } from '@/components/admin';
import { ApplicationActions } from './actions.client';
import { ApplicationNotes } from './notes.client';
import { CvPdfPreview } from './cv-preview';
import { getApplication } from '@/lib/api';

export default async function ApplicationDetailPage({ params }: { params: { id: string } }) {
  const application = await getApplication(params.id);
  if (!application) notFound();

  return (
    <AdminLayout active="candidatures">
      <AdminPageHead
        title={<>{application.firstName} <Italic>{application.lastName}</Italic></>}
        subtitle={`⌗ ${application.desiredRole} · ${application.yearsExperience} ans · reçue le ${application.createdAt.toLocaleDateString('fr-FR')}`}
      />
      <ApplicationActions application={application} />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-s-6 items-start">
        <div className="space-y-s-5">
          {/* Card 01 — Infos candidat · Card 02 — Lettre · Card 03 — Notes timeline */}
          <ApplicationNotes applicationId={application.id} notes={application.internalNotes} />
        </div>
        <CvPdfPreview url={application.cvUrl} filename={application.cvFilename} />
      </div>
    </AdminLayout>
  );
}
