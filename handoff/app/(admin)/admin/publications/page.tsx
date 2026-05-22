/**
 * /admin/publications — Liste des articles.
 *
 * DESIGN INTENT
 *   - KPI ribbon 4 stats (publiés / brouillons / relecture / vues 30j)
 *   - Filter bar 2 niveaux : chips statut + selects expertise/auteur/période + search
 *   - Table 9 colonnes responsive : checkbox · titre+chapeau · type pill · expertise · auteur · status badge · date mono · vues · row-actions
 *   - Hover row révèle actions rapides (3 boutons icônes)
 *   - Sélection multiple : selected rows fond antarès light · barre flottante bas-centre fond encre (4 actions Publier/Archiver/Exporter/Supprimer-danger)
 *   - Pagination · per-page select + pills numériques
 */
import { AdminLayout, AdminPageHead, Italic } from '@/components/admin';
import { ArticlesTable } from './table.client';
import { listArticles, listExpertises, listAuthors, getArticleStats } from '@/lib/api';

interface SearchParams { status?: string; expertise?: string; author?: string; q?: string; sort?: string; page?: string }

export default async function ArticlesListPage({ searchParams }: { searchParams: SearchParams }) {
  const [stats, articlesPage, expertises, authors] = await Promise.all([
    getArticleStats(),
    listArticles(searchParams),
    listExpertises(),
    listAuthors(),
  ]);

  return (
    <AdminLayout active="publications">
      <AdminPageHead
        title={<>Toutes les <Italic>publications</Italic></>}
        subtitle={`⌗ ${stats.total} articles · ${authors.length} auteurs · ${expertises.length} expertises`}
        actions={
          <>
            <a className="btn btn-ghost btn-sm" href="?export=csv">⌗ Exporter CSV</a>
            <a className="btn btn-primary btn-sm" href="/admin/publications/new">+ Nouvel article</a>
          </>
        }
      />
      <ArticlesTable
        articles={articlesPage.items}
        total={articlesPage.total}
        page={articlesPage.page}
        stats={stats}
        expertises={expertises}
        authors={authors}
        initial={searchParams}
      />
    </AdminLayout>
  );
}
