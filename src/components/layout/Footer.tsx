const Footer = () => {
  return (
    <footer className="border-t border-border py-8 pb-20 sm:pb-4 text-sm text-muted">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p>&copy; {new Date().getFullYear()} Linn German</p>
        <p className="mt-1">
          Linn German's own curriculum, aligned conceptually with CEFR levels. Not
          Goethe-certified.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
