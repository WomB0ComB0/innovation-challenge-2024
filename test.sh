#!/bin/bash

# Create main app directory
mkdir -p src/app/{auth,plans,dashboard/settings,books/[bookId],translate/[bookId],listen/[translationId],library,api-docs,business,support,about,api/{auth,translate,subscription}}

# Create page files for each route
touch src/app/auth/page.tsx
touch src/app/plans/page.tsx
touch src/app/dashboard/layout.tsx
touch src/app/dashboard/page.tsx
touch src/app/dashboard/settings/page.tsx
touch src/app/books/page.tsx
touch src/app/books/[bookId]/page.tsx
touch src/app/translate/[bookId]/page.tsx
touch src/app/listen/[translationId]/page.tsx
touch src/app/library/page.tsx
touch src/app/api-docs/page.tsx
touch src/app/business/page.tsx
touch src/app/support/page.tsx
touch src/app/about/page.tsx

# Create API route files
touch src/app/api/translate/route.ts
touch src/app/api/subscription/route.ts

# Add basic content to layout files
echo 'export default function DashboardLayout({ children }) { return <div className="dashboard-layout">{children}</div> }' > src/app/dashboard/layout.tsx

# Add basic content to page files
echo 'export default function Auth() { return <div>Auth Page</div> }' > src/app/auth/page.tsx
echo 'export default function Plans() { return <div>Plans Page</div> }' > src/app/plans/page.tsx
echo 'export default function Dashboard() { return <div>Dashboard Page</div> }' > src/app/dashboard/page.tsx
echo 'export default function Settings() { return <div>Settings Page</div> }' > src/app/dashboard/settings/page.tsx
echo 'export default function Books() { return <div>Books Page</div> }' > src/app/books/page.tsx
echo 'export default function Book({ params }) { return <div>Book {params.bookId}</div> }' > src/app/books/[bookId]/page.tsx
echo 'export default function Translate({ params }) { return <div>Translate Book {params.bookId}</div> }' > src/app/translate/[bookId]/page.tsx
echo 'export default function Listen({ params }) { return <div>Listen Translation {params.translationId}</div> }' > src/app/listen/[translationId]/page.tsx
echo 'export default function Library() { return <div>Library Page</div> }' > src/app/library/page.tsx
echo 'export default function ApiDocs() { return <div>API Documentation</div> }' > src/app/api-docs/page.tsx
echo 'export default function Business() { return <div>Business Page</div> }' > src/app/business/page.tsx
echo 'export default function Support() { return <div>Support Page</div> }' > src/app/support/page.tsx
echo 'export default function About() { return <div>About Page</div> }' > src/app/about/page.tsx

# Add basic content to API route files
echo 'export async function POST(req) { return Response.json({ message: "Translation API" }) }' > src/app/api/translate/route.ts
echo 'export async function POST(req) { return Response.json({ message: "Subscription API" }) }' > src/app/api/subscription/route.ts
