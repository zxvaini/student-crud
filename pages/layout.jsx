export const metadata = { title: 'Students CRUD', description: 'XII SIJA B Students Manager' };


export default function RootLayout({ children }) {
return (
<html lang="en">
<head>
{/* Bootstrap 5 CSS */}
<link
href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
rel="stylesheet"
/>
</head>
<body>
{children}
{/* Bootstrap Bundle JS */}
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
);
}
