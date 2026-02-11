<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Banner;
use App\Models\Project;
use App\Models\CareerListing;
use App\Models\ContactDetail;

class CmsDataSeeder extends Seeder
{
    public function run(): void
    {
        // 1. CLEAR EXISTING DATA FOR FRESH START
        Banner::truncate();
        Project::truncate();
        CareerListing::truncate();
        ContactDetail::truncate();

        // 2. SEED BANNERS (EXACT STRINGS FROM HEROCAROUSEL.TSX)
        $banners = [
            [
                'title' => 'Technical Excellence',
                'badge' => 'PMC',
                'subtitle' => "Navigating the complexities of large-scale construction with data-driven precision. We transform blueprints into reality through rigorous oversight.",
                'image_url' => 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000', // hero7 replacement
                'link' => '/projects',
                'order_index' => 1
            ],
            [
                'title' => 'Operational Synergy',
                'badge' => 'PMC',
                'subtitle' => "Fostering seamless collaboration between architects, engineers, and vendors. We act as the central nervous system for your most ambitious projects.",
                'image_url' => 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2000', // hero8 replacement
                'link' => '/projects',
                'order_index' => 2
            ],
            [
                'title' => 'Strategic Oversight',
                'badge' => 'PMC',
                'subtitle' => "Mitigating risks and optimizing resources across every phase of development. Our methodology ensures timelines and budgets are strictly honored.",
                'image_url' => "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070",
                'link' => '/projects',
                'order_index' => 3
            ],
            [
                'title' => 'Luminous Workspaces',
                'badge' => 'COMMERCIAL',
                'subtitle' => "Designing open-concept corporate environments that foster innovation and wellness. Elevating the standard of the modern professional headquarters.",
                'image_url' => 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2000', // hero1 replacement
                'link' => '/projects',
                'order_index' => 4
            ],
            [
                'title' => 'Corporate Identity',
                'badge' => 'COMMERCIAL',
                'subtitle' => "Translating brand values into physical space through bespoke interior architecture. High-performance design meets professional aesthetic authority.",
                'image_url' => 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2000', // hero2 replacement
                'link' => '/projects',
                'order_index' => 5
            ],
            [
                'title' => 'Future-Ready Offices',
                'badge' => 'COMMERCIAL',
                'subtitle' => "Integrating smart technology and sustainable materials into commercial hubs. Crafting the infrastructure for the next generation of industry leaders.",
                'image_url' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000', // hero3 replacement
                'link' => '/projects',
                'order_index' => 6
            ],
            [
                'title' => 'Modern Sanctuaries',
                'badge' => 'RESIDENTIAL',
                'subtitle' => "Balancing minimalist aesthetics with the warmth of a private retreat. Every corner is meticulously curated to reflect your personal narrative.",
                'image_url' => 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000', // hero4 replacement
                'link' => '/projects',
                'order_index' => 7
            ],
            [
                'title' => 'Artisanal Interiors',
                'badge' => 'RESIDENTIAL',
                'subtitle' => "Where hand-selected textures and custom finishes meet timeless architecture. Defining luxury through the lens of comfort and exclusivity.",
                'image_url' => 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2000', // hero5 replacement
                'link' => '/projects',
                'order_index' => 8
            ],
            [
                'title' => 'Urban Elegance',
                'badge' => 'RESIDENTIAL',
                'subtitle' => "Sophisticated residential living designed for the discerning individual. A masterclass in spatial harmony and refined domestic living.",
                'image_url' => 'https://images.unsplash.com/photo-1618219944342-824e40a13285?q=80&w=2000', // hero6 replacement
                'link' => '/projects',
                'order_index' => 9
            ],
        ];

        foreach ($banners as $banner) {
            Banner::create($banner);
        }

        // 3. SEED PROJECTS (GALLERY DATA FROM PROJECTSSECTION.TSX)
        $projectImages = [
            'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
            'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
            'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800',
            'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800',
            'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=800',
            'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800',
            'https://images.unsplash.com/photo-1618219944342-824e40a13285?w=800',
            'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
            'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
            'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800',
            'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800',
            'https://images.unsplash.com/photo-1503387762-592adeeeba1c?w=800',
            'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800',
            'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=800'
        ];

        foreach ($projectImages as $index => $img) {
            Project::create([
                'title' => 'Arsen Masterpiece ' . ($index + 1),
                'location' => $index % 2 === 0 ? 'Chennai' : 'Trichy',
                'type' => $index % 3 === 0 ? 'Commercial' : ($index % 3 === 1 ? 'Residential' : 'PMC'),
                'status' => $index % 5 === 0 ? 'ongoing' : 'completed',
                'image_url' => $img,
                'is_featured' => $index < 6,
                'order_index' => $index
            ]);
        }

        // 4. SEED CAREERS (EXACT FROM CAREER.TSX)
        $jobs = [
            [
                'title' => 'Senior Project Manager',
                'department' => 'Project Management',
                'location' => 'Trichy',
                'salary' => 'Competitive',
                'specifications' => ["12–15 Years Experience", "Luxury Residential Background", "International Vendor Management"],
                'image_url' => "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200"
            ],
            [
                'title' => 'Lead Interior Architect',
                'department' => 'Design Studio',
                'location' => 'Remote',
                'salary' => 'Industry Standard',
                'specifications' => ["Concept to Execution", "Revit & Rhino Proficiency", "High-End FF&E Knowledge"],
                'image_url' => "https://cdn.pixabay.com/photo/2015/04/20/06/46/office-730681_1280.jpg"
            ],
            [
                'title' => 'Visualizer (CGI)',
                'department' => 'Creative Team',
                'location' => 'Chennai',
                'salary' => 'Based on Portfolio',
                'specifications' => ["Unreal Engine Expertise", "Photorealistic Rendering", "3ds Max & V-Ray"],
                'image_url' => "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200"
            ],
        ];

        foreach ($jobs as $job) {
            CareerListing::create($job);
        }

        // 5. SEED CONTACT (EXACT FROM CONTACT.TSX)
        $details = [
            ['label' => 'Call Us', 'value' => '+91 8098085553, 8144555522', 'type' => 'phone'],
            ['label' => 'Email Us', 'value' => 'sales@arseninterior.in', 'type' => 'email'],
            ['label' => 'Arsen Interior PVT LTD', 'value' => '#4, Noombal Road, Velappanchavadi Chennai – 600 077.', 'type' => 'address'],
            ['label' => 'Arsen Furnitures and Fixtures', 'value' => 'No.211/1B, Metro city phase 1, Rajankuppam, Ayanambakkam, Chennai - 600095', 'type' => 'address'],
        ];

        foreach ($details as $detail) {
            ContactDetail::create($detail);
        }
    }
}
