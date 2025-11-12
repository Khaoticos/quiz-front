import { ReactNode } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { AnimatedPage } from "@/components/AnimatedPage";

interface LayoutProps {
  children: ReactNode;
  /** Include footer at the bottom of the page */
  showFooter?: boolean;
  /** Additional CSS classes for the main container */
  className?: string;
  /** Additional CSS classes for the content wrapper */
  contentClassName?: string;
}

/**
 * Common layout component that wraps pages with Navigation and optional Footer
 * Includes AnimatedPage for smooth page transitions
 */
const Layout = ({
  children,
  showFooter = false,
  className = "min-h-screen",
  contentClassName = ""
}: LayoutProps) => {
  return (
    <AnimatedPage className={className}>
      <Navigation />
      <main className={contentClassName}>
        {children}
      </main>
      {showFooter && <Footer />}
    </AnimatedPage>
  );
};

export default Layout;
