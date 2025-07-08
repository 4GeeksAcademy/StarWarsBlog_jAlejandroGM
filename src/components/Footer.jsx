export const Footer = () => (
    <footer className="footer py-2 bg-gradient text-light text-center">
        <div className="container">
            <p className="mb-0">
                &copy; {new Date().getFullYear()} Star Wars Blog. All rights reserved.
            </p>
                <a href="https://www.starwars.com/" target="_blank" className="text-light mx-2">
                    Official Star Wars
                </a>
            <div>
                <a href="https://twitter.com/" target="_blank" className="text-warning mx-2">
                    <i className="fab fa-twitter"></i>
                </a>
                <a href="https://facebook.com/" target="_blank" className="text-warning mx-2">
                    <i className="fab fa-facebook"></i>
                </a>
                <a href="https://instagram.com/" target="_blank" className="text-warning mx-2">
                    <i className="fab fa-instagram"></i>
                </a>
            </div>
        </div>
    </footer>
);