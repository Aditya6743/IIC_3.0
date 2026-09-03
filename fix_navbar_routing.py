import re

with open('src/components/Navbar.tsx', 'r') as f:
    content = f.read()

# Update handleNavClick to ensure scrolling to top on route change
old_handler = '''  const handleNavClick = (path: string) => {
    const [route, section] = path.split('#');

    if (location.pathname !== route && route !== '') {
      navigate(path);
    } else if (section) {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (route === '' || route === location.pathname) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    setIsMenuOpen(false);
  };'''

new_handler = '''  const handleNavClick = (path: string) => {
    const [route, section] = path.split('#');

    if (location.pathname !== route && route !== '') {
      navigate(path);
      // Wait for page transition to start, then snap to top
      setTimeout(() => window.scrollTo(0, 0), 100);
    } else if (section) {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (route === '' || route === location.pathname) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    setIsMenuOpen(false);
  };'''

content = content.replace(old_handler, new_handler)

# Update MUJ Logo Link
old_muj = '''            <Link
              to="/"
              className="flex items-center space-x-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
              aria-label="IIC Home"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >'''

new_muj = '''            <Link
              to="/"
              className="flex items-center space-x-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
              aria-label="IIC Home"
              onClick={(e) => { e.preventDefault(); handleNavClick('/'); }}
            >'''
content = content.replace(old_muj, new_muj)

# Update IIC Logo Link
old_iic = '''            <Link
              to="/"
              className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
              aria-label="IIC Home"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >'''

new_iic = '''            <Link
              to="/"
              className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
              aria-label="IIC Home"
              onClick={(e) => { e.preventDefault(); handleNavClick('/'); }}
            >'''
content = content.replace(old_iic, new_iic)

with open('src/components/Navbar.tsx', 'w') as f:
    f.write(content)

print("Navbar updated")
