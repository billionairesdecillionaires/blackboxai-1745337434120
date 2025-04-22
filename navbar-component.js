class NavbarComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        try {
            this.innerHTML = `
                <style>
                    nav {
                        overflow: visible !important;
                        background: linear-gradient(to right, #fff9f5, #ffffff, #fff9f5);
                        border-bottom: 1px solid rgba(251, 146, 60, 0.08);
                    }
                    
                    .nav-container {
                        position: relative;
                        overflow: visible !important;
                    }

                    .nav-item {
                        position: relative;
                        cursor: pointer;
                        padding-bottom: 1.5rem;
                        margin-bottom: -1.5rem;
                    }

                    .nav-dropdown {
                        position: absolute;
                        top: calc(100% - 0.5rem);
                        left: 50%;
                        transform: translateX(-50%);
                        background: #fff9f5;
                        border-radius: 16px;
                        padding: 1rem;
                        min-width: 260px;
                        opacity: 0;
                        visibility: hidden;
                        transition: all 0.3s ease;
                        z-index: 100;
                        box-shadow: 0 4px 15px rgba(251, 146, 60, 0.1);
                        border: 1px solid rgba(251, 146, 60, 0.08);
                    }

                    /* Special positioning for Services dropdown to prevent right-side cropping */
                    .nav-item:nth-last-child(2) .nav-dropdown {
                        left: auto;
                        right: 0;
                        transform: translateX(0);
                    }

                    .nav-item:nth-last-child(2) .nav-dropdown::before {
                        left: auto;
                        right: 30%;
                    }

                    .nav-dropdown::before {
                        content: '';
                        position: absolute;
                        top: -8px;
                        left: 50%;
                        transform: translateX(-50%);
                        border-left: 8px solid transparent;
                        border-right: 8px solid transparent;
                        border-bottom: 8px solid rgba(251, 146, 60, 0.08);
                    }

                    .nav-item:hover .nav-dropdown {
                        opacity: 1;
                        visibility: visible;
                    }

                    .nav-link {
                        color: #1f2937;
                        font-weight: 500;
                        transition: all 0.2s ease;
                        padding: 0.5rem 0;
                        display: inline-block;
                        position: relative;
                    }

                    .nav-link:hover {
                        color: #f97316;
                    }

                    .nav-link::after {
                        content: '';
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        height: 2px;
                        background-color: #f97316;
                        transform: scaleX(0);
                        transition: transform 0.2s ease;
                    }

                    .nav-link:hover::after {
                        transform: scaleX(1);
                    }

                    .dropdown-item {
                        display: flex;
                        align-items: center;
                        padding: 0.625rem;
                        border-radius: 10px;
                        transition: all 0.2s ease;
                        color: #1f2937;
                        white-space: nowrap;
                        font-size: 0.9375rem;
                    }

                    .dropdown-item:hover {
                        background: rgba(251, 146, 60, 0.05);
                        color: #f97316;
                    }

                    .icon-container {
                        width: 36px;
                        height: 36px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: rgba(251, 146, 60, 0.1);
                        border-radius: 50%;
                        margin-right: 0.875rem;
                        transition: all 0.2s ease;
                        flex-shrink: 0;
                    }

                    .dropdown-item:hover .icon-container {
                        background: rgba(251, 146, 60, 0.15);
                        transform: scale(1.05);
                    }

                    .dropdown-item:hover .icon-container i {
                        transform: scale(1.1);
                    }

                    .icon-container i {
                        transition: transform 0.2s ease;
                        font-size: 0.875rem;
                    }
                </style>
                <nav class="fixed top-0 left-0 right-0 shadow-sm z-50">
                    <div class="nav-container container mx-auto px-6 py-4">
                        <div class="flex justify-between items-center">
                            <!-- Logo -->
                            <a href="Home.html" class="flex items-center">
                                <img src="images/logo.png" alt="Jeevnik Logo" class="h-12 w-auto">
                            </a>
                            
                            <!-- Desktop Navigation -->
                            <div class="hidden md:flex items-center space-x-10">
                                <div class="nav-item">
                                    <a href="Home.html" class="nav-link">Home</a>
                                </div>            
                                
                                <!-- Assessment with dropdown -->
                                <div class="nav-item">
                                    <a href="#" class="nav-link">Assessment</a>
                                    <div class="nav-dropdown">
                                        <a href="quiz.html" class="dropdown-item">
                                            <div class="icon-container">
                                                <i class="fas fa-heartbeat text-orange-600"></i>
                                            </div>
                                            <span>Jeevnik Vitality Assessment</span>
                                        </a>
                                        <a href="#" class="dropdown-item mt-2">
                                            <div class="icon-container">
                                                <i class="fas fa-chart-line text-orange-600"></i>
                                            </div>
                                            <span>Diabetes Risk Assessment</span>
                                        </a>
                                        <a href="#" class="dropdown-item mt-2">
                                            <div class="icon-container">
                                                <i class="fas fa-brain text-orange-600"></i>
                                            </div>
                                            <span>Mental Health assessment in Diabetes</span>
                                        </a>
                                    </div>
                                </div>
                                
                                <!-- Digital Twin -->
                                <div class="nav-item">
                                    <a href="JivnikDigiTwin.html" class="nav-link">Jeevnik Digital Twin</a>
                                </div>
                                
                                <!-- Services with dropdown -->
                                <div class="nav-item">
                                    <a href="#" class="nav-link">Services</a>
                                    <div class="nav-dropdown">
                                        <a href="ForDoctor.html" class="dropdown-item">
                                            <div class="icon-container">
                                                <i class="fas fa-user-md text-orange-600"></i>
                                            </div>
                                            <span>For Doctors: EHR for Diabetologist</span>
                                        </a>
                                        <a href="ForPatients.html" class="dropdown-item mt-2">
                                            <div class="icon-container">
                                                <i class="fas fa-user-injured text-orange-600"></i>
                                            </div>
                                            <span>For Patients: Diabetes Reversal Program</span>
                                        </a>
                                    </div>
                                </div>
                                
                                <!-- About Us -->
                                <div class="nav-item">
                                    <a href="#" class="nav-link">About Us</a>
                                </div>
                            </div>

                            <!-- Mobile Menu Button (Hidden on Desktop) -->
                            <button class="md:hidden text-gray-800 hover:text-orange-500" id="mobile-menu-button" aria-label="Toggle mobile menu">
                                <i class="fas fa-bars text-2xl"></i>
                            </button>
                        </div>
                    </div>
                </nav>
            `;
        } catch (error) {
            console.error('Error rendering navbar:', error);
            this.innerHTML = '<div class="text-red-500 p-4">Error loading navigation</div>';
        }
    }
}

// Register the custom element
customElements.define('navbar-component', NavbarComponent);
