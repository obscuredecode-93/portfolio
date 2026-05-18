export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Name + copyright */}
        <div className="text-center md:text-left">
          <span className="font-bold gradient-text text-base">Anurag Lakshminarayan</span>
          <p className="text-white/30 text-xs mt-1">
            © {new Date().getFullYear()} · Built with Next.js & Tailwind CSS
          </p>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/obscuredecode-93"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-cyan text-xs transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/anurag-lakshminarayan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-cyan text-xs transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:anurag.lakshminarayan93@gmail.com"
            className="text-white/40 hover:text-cyan text-xs transition-colors"
          >
            Email
          </a>
          {/* Hidden admin access — visually invisible, discoverable by URL */}
          <a
            href="/admin/projects"
            className="text-white/5 hover:text-white/20 text-xs transition-colors"
            tabIndex={-1}
          >
            ·
          </a>
        </div>
      </div>
    </footer>
  );
}
