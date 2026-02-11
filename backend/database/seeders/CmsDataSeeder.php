<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CmsDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Clear existing data
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('banners')->truncate();
        DB::table('projects')->truncate();
        DB::table('career_listings')->truncate();
        DB::table('contact_details')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // 2. Seed Banners (Based on HeroCarousel.tsx)
        $banners = [
            // PMC
            [
                'title' => 'Technical Excellence',
                'subtitle' => 'Navigating the complexities of large-scale construction with data-driven precision. We transform blueprints into reality through rigorous oversight.',
                'badge' => 'PMC',
                'image_url' => 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop', // Project Site
                'order_index' => 1,
            ],
            [
                'title' => 'Operational Synergy',
                'subtitle' => 'Fostering seamless collaboration between architects, engineers, and vendors. We act as the central nervous system for your most ambitious projects.',
                'badge' => 'PMC',
                'image_url' => 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070&auto=format&fit=crop', // Architect Plan
                'order_index' => 2,
            ],
            [
                'title' => 'Strategic Oversight',
                'subtitle' => 'Mitigating risks and optimizing resources across every phase of development. Our methodology ensures timelines and budgets are strictly honored.',
                'badge' => 'PMC',
                'image_url' => 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070', // Construction
                'order_index' => 3,
            ],
            // COMMERCIAL
            [
                'title' => 'Luminous Workspaces',
                'subtitle' => 'Designing open-concept corporate environments that foster innovation and wellness. Elevating the standard of the modern professional headquarters.',
                'badge' => 'COMMERCIAL',
                'image_url' => 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070', // Modern Office
                'order_index' => 4,
            ],
            [
                'title' => 'Corporate Identity',
                'subtitle' => 'Translating brand values into physical space through bespoke interior architecture. High-performance design meets professional aesthetic authority.',
                'badge' => 'COMMERCIAL',
                'image_url' => 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2070', // Meeting Room
                'order_index' => 5,
            ],
            [
                'title' => 'Future-Ready Offices',
                'subtitle' => 'Integrating smart technology and sustainable materials into commercial hubs. Crafting the infrastructure for the next generation of industry leaders.',
                'badge' => 'COMMERCIAL',
                'image_url' => 'https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=2070', // Tech Office
                'order_index' => 6,
            ],
            // RESIDENTIAL
            [
                'title' => 'Modern Sanctuaries',
                'subtitle' => 'Balancing minimalist aesthetics with the warmth of a private retreat. Every corner is meticulously curated to reflect your personal narrative.',
                'badge' => 'RESIDENTIAL',
                'image_url' => 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2070', // Minimal Living Room
                'order_index' => 7,
            ],
            [
                'title' => 'Artisanal Interiors',
                'subtitle' => 'Where hand-selected textures and custom finishes meet timeless architecture. Defining luxury through the lens of comfort and exclusivity.',
                'badge' => 'RESIDENTIAL',
                'image_url' => 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2070', // Modern Kitchen
                'order_index' => 8,
            ],
            [
                'title' => 'Urban Elegance',
                'subtitle' => 'Sophisticated residential living designed for the discerning individual. A masterclass in spatial harmony and refined domestic living.',
                'badge' => 'RESIDENTIAL',
                'image_url' => 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070', // Living Area
                'order_index' => 9,
            ],
        ];

        foreach ($banners as $banner) {
            DB::table('banners')->insert(array_merge($banner, [
                'link' => '/projects',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }

        // 3. Seed Ongoing Projects (Based on Ongoing.tsx)
        $ongoingProjects = [
            [
                'title' => 'Temenos – KG360',
                'location' => 'Perungudi, Chennai',
                'progress' => 92,
                'image_url' => 'https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,fl_progressive,q_auto,w_1024/640eff394904ce001dea70b8.jpg',
                'description' => 'IT Business Park, Plot No. 232/1 Veera am Street, OMR Bypass Road',
                'type' => 'Commercial',
            ],
            [
                'title' => 'GMMCO',
                'location' => 'Salem',
                'progress' => 74,
                'image_url' => 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop',
                'description' => 'Strategic Industrial Development',
                'type' => 'Industrial',
            ],
            [
                'title' => 'Sundaram Finance',
                'location' => 'Mount Road, Chennai',
                'progress' => 85,
                'image_url' => 'https://cdn.buildofy.com/projects/1809e23e-c606-43ce-a215-c6d42c03002f.jpeg',
                'description' => 'Iconic Mount Road Landmark',
                'type' => 'Commercial',
            ],
        ];

        foreach ($ongoingProjects as $i => $proj) {
            DB::table('projects')->insert([
                'title' => $proj['title'],
                'location' => $proj['location'],
                'progress' => $proj['progress'],
                'image_url' => $proj['image_url'],
                'description' => $proj['description'],
                'type' => $proj['type'],
                'status' => 'ongoing',
                'is_featured' => true,
                'order_index' => $i + 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // 4. Seed Completed Projects (Based on Completed.tsx)
        // This is the COMPLETE 233+ list as requested
        $completedRaw = [
            "Capital Profit ( ERODE )", "World of Titan ( ERODE)", "JLR - Jaguar and Land Rover Show room ( JUBILEE HILLS , HYDERABAD )", "JLR - Jaguar and Land Rover Service Centre ( KOTHAGUDA , HYDERABAD )", "Crocs ( EXPRESS AVENUE , CHENNAI )", "World of Titan ( TIRUPPUR)", "Titan Eye Plus ( TIRUPPUR )", "Titan Eye Plus ( ERODE)", "Johnson Tiles ( KARUR )", "Aditya Birla - People ( PREMIER PLAZA , PIMPRI , PUNE )", "World of Titan ( PERAMBUR , CHENNAI )", "Titan Eye Plus ( PERAMBUR , CHENNAI )", "Odyssey ( TRICHY )", "Mr Venkatesh Residencial @ KK NAGAR", "Aditya Birla - People ( AMANORA MALL , PUNE )", "Aditya Birla - People ( KOLHAPUR , MAHARASTRA )", "Aditya Birla - People ( PREMIER PLAZA , PIMPRI , PUNE )", "Aditya Birla - People ( NASIK , MAHARASTRA )", "BVCPS - Bureau Veritas Consumer Product Service ( CHENNAI )", "Aditya Birla - People ( HASSAN , KARNATAKA )", "Titan Innovation Centre ( IITM , CHENNAI )", "BVCPS - Bureau Veritas Consumer Product Service ( CHENNAI )", "Titan Innovation Centre ( IITM , CHENNAI )", "Aditya Birla - People ( HUBLI , KARNATAKA )", "Aditya Birla - People ( NASIK , MAHARASTRA )", "Sargam Laboratory ( CHENNAI )", "Titan Innovation Centre ( IITM , CHENNAI )", "Aditya Birla - People ( INDRA NAGAR , BANGALORE )", "BVCPS - Bureau Veritas Consumer Product Service ( CHENNAI )", "Aditya Birla - People ( BRIGADE ROAD , BANGALORE )", "Aditya Birla - People ( JAYA NAGAR , BANGALORE )", "Asahi India ( SRIPERUMBUDUR , KANCHIPURAM )", "Fastrack ( ROYAPURAM , CHENNAI )", "Asahi India ( SRIPERUMBUPUR , KANCHIPURAM )",
            "Titan Industries - HELIOS ADNL ( CHENNAI )", "Titan Innovation Centre ( IITM - CHENNAI )", "Aditya birla - People ( JAYA NAGAR , BANGALORE )", "TAFE - Tractor and Form Equipments ( CHENNAI )", "Asahi India ( SRIPERUMPUDUR , KANCHIPURAM )", "Titan Area Office ( T.NAGAR )", "Titan Industries Limited ( TANISHQ , T.NAGAR )", "Aditya Birla Nuvo Ltd - People ( INDIRA NAGAR , BANGALORE )", "Aditya Birla Nuvo Ltd - People ( BRIGADE ROAD , BANGALORE )", "Aditya Birla - People ( CMH ROAD , BANGALORE )", "Titan Industries Limited ( AREA OFFICE , T.NAGAR )", "Fastrack ( CATHEDRAL ROAD , CHENNAI )", "Sargam Laboratory Pvt Ltd ( CHENNAI )", "Aditya Birla - People ( AUNDH , PUNE )", "Green Trends ( VELACHERRY , CHENNAI )", "Aditya Birla - People ( AUNDH , PUNE )", "Green Trends ( KOTTURPURAM , CHENNAI )", "Titan Industries Ltd - Area Office ( T.NAGAR )", "Aditya Birla - People ( HASSAN , KARNATAKA )", "Green Trends ( KOVILAMBAKKAM , CHENNAI )", "BVCPS - Bureau Veritas Consumer Products Services ( CHENNAI )", "Aditya Birla - People ( VIDYARANYAPURA , BANGALORE )", "Aditya Birla - People ( DAVANAGERE , BANGALORE )", "Green Trends ( R V ROAD , CHENNAI )", "Green Trends ( BANJARA HILLS , HYDERABAD )", "Aditya Birla - People ( BEL , KORAMANGALA , BANGALORE )", "Aditya Birla - People ( BANGALORE )", "Aditya Birla - People ( COMMERCIAL STREET-2 , BANGALORE )", "Fastrack ( R.K.SALAI , CHENNAI )", "Green Trends ( AOC , HYDERABAD )", "Aditya Birla - People ( WHITEFEILD , BANGALORE )", "Max Power Services ( CHENNAI )",
            "Green Trends ( SOUTH BOAG ROAD , CHENNAI )", "Limelite ( JAYANAGAR , BANGALORE )", "Aditya Birla - People ( GOPALAN INNOVATION MALL , BANGALORE )", "Aditya Birla - People ( J.P.NAGAR , MAINTENANCE , BANGALORE )", "Titan Company Limited ( TANISHQ GRANITE , T.NAGAR )", "Titan Company Limited ( CATHDERAL ROAD ))", "Aditya Birla - People ( FORUM VALUE MALL )", "World Of Titan ( ACS , PONDY BAZZAR - WOT )", "World Of Titan ( ACS , PONDY BAZZAR - WCC )", "World Of Titan - Electrical ( ACS , PONDY BAZZAR , WOT )", "World Of Titan - Electrical ( ACS , PONDY BAZZAR , WCC )", "Aditya Birla - People ( KORAMANGALA , BANGALORE )", "Limelite - Maintenance ( JAYANAGAR )", "Aditya Birla - People ( DAVANEGARE , BANGALORE )", "Fastrack ( TRICHY )", "Aditya Birla - People ( MG ROAD , BANGALORE )", "Green Trends ( ANNANAGAR , CHENNAI )", "World Of Titan ( PERAMBUR , CHENNAI )", "Green Trends ( PERUNGUDI , CHENNAI )", "Green Trends ( PERUMBAKKAM , CHENNAI )", "Titan Company Limited ( PONDYBAZAR , CHENNAI )", "Petrofac Engg Services (I) Pvt Ltd ( CHENNAI )", "Aditya Birla - People ( SKYWALK , CHENNAI )", "Green Trends ( ROYAPURAM , CHENNAI )", "Petrofac Engg Services (I) Pvt Ltd , 1 St Floor ( CHENNAI )", "Green Trend ( PALAKKAD , KERALA )", "Petrofac Engg Services (I) Pvt Ltd ( CHENNAI )", "Green Trends ( VIVEKANANDA NAGAR , HYDERABAD )", "Green Trends ( MOGALRAJPURAM , VIJAYAWADA )", "Green Trends ( VIVEKANANDA NAGAR , HYDERABAD )",
            "Green Trends ( LAKSHMI NAGAR , GUNTUR )", "Asahi India Glass Limited ( KANCHIPURAM )", "Aditya Birla - People ( YELAHANKA , BANGALORE )", "Green Trends ( SOUTH BOAG ROAD , CHENNAI )", "Aditya Birla - People ( YELAHANKA NEW TOWN , BANGALORE )", "New Designer Web Private Limited ( CHENNAI )", "Aditya Birla - People ( YELAHANKA NEW TOWN , BANGALORE )", "Fastrack ( TRICHY )", "Green Trends ( ATTAPUR , HYDERABAD )", "Dr Agarwal's Eye Hospital Ltd ( PORUR - CHENNAI )", "Dr Agarwal's Healthcare Ltd ( CHETPET , CHENNAI )", "Green Trends ( SINDHI COLONY , HYDERABAD )", "Petrofac Engg Services (I) Pvt Ltd ( CHENNAI )", "Aditya Birla - People ( INDIRANAGAR , BANGALORE )", "Dr Agarwal's Healthcare Limited ( TIRUNELVELI )", "Dr Agarwal's Eye Hospital Ltd ( CATHEDRAL ROAD , CHENNAI )", "Dr Agarwal's Healthcare Ltd ( BANNERGHATTA , BANGALORE )", "Green Trends ( KUKATPALLY , HYDERABAD )", "Dr Agarwals Healthcare Ltd ( ADAYAR )", "Green Trends ( BANASHANKARI , BANGALORE )", "Vinayaka Associates ( KOVILAMBAKKAM )", "TAFE - Tractors & Farm Equipment ( NUNGAMBAKKAM )", "Green Trends ( MANIGONDA , HYDERABAD )", "Green Trends ( KOVILAMBAKKAM , CHENNAI )", "Mr.Charls Pradeep Paul - Residential ( CHENNAI )", "Green Trends ( C.V.RAMAN NAGAR , CHENNAI )", "Green Trends ( D.D.COLONY , HYDERABAD )", "TAFE - Tractors & Farm Equipment ( R.K.SALAI )", "TAFE - Tractors & Farm Equipment ( NUNGAMBAKKAM )", "Dr Agarwal's Healthcare Ltd ( BANNERGHATTA , BANGALORE )", "Dr Agarwal's Healthcare Ltd ( ADYAR )",
            "Aditya Birla - People ( HASSAN )", "BVCPS - Bureau Veritas Consumer Products Services ( GUINDY , CHENNAI )", "Dr Agarwal's Healthcare Ltd ( TRIPLICANE )", "TAFE - Tractors & Farm Equipment ( NUNGAMBAKKAM )", "Green Trends ( BAGALUR ROAD , HOSUR )", "Aumento Ventures ( BANGALORE )", "I Gate Global Solutions Ltd ( CHENNAI )", "Dr Agarwal's Eye Hospital Ltd ( CHENNAI )", "Green Trends ( BANASHANKARI , BANGALORE )", "Dr Agarwal's Eye Hospital Ltd ( PORUR )", "Dr Agarwal's Eye Hospital Ltd ( ASHOKNAGAR )", "Green Trends ( KOVILAMBAKKAM , CHENNAI )", "TAFE - Tractors & Farm Equipment ( CHENNAI )", "Dr Agarwal's Eye Hospital Ltd ( ANNANAGAR )", "New Designer Web Pvt Ltd ( KRIZZ - BANGALORE )", "Trends Invogue Pvt Ltd ( HSR LAYOUT )", "New Designer Web Private Limited ( CHENNAI )", "Green Trends ( MADAMBAKKAM , CHENNAI )", "Dr Agarwal's Healthcare Ltd ( ADAYAR )", "Dr Agarwal's Eye Hospital Ltd ( PORUR )", "Dr Agarwal's Eye Institute ( BISHOP GARDEN , CHENNAI )", "Green Trends ( SINDHI COLONY , HYDERABAD )", "Green Trends (SOUTH BOAG ROAD , CHENNAI )", "Dr Agarwal's Healthcare Ltd ( WHITE FIELD , BANGALORE )", "Dr Agarwal Healthcare Ltd ( TRICHY )", "Limelite - Banashankari ( BANGALORE )", "BVCPS - Bureau Veritas Consumer Products Services ( CHENNAI )", "Aumento Ventures ( BANGALORE )", "New Designer Web Private Limited ( FISERVE - CHENNAI )", "Dr Agarwal's Eye Hospital Ltd ( GUINDY , CHENNAI )", "World Of Titan ( PERAMBUR , CHENNAI )", "TAFE - Tractors & Farm Equipment ( CHENNAI )",
            "Dr Agarwal's Eye Research Centre ( GREAMS ROAD , CHENNAI )", "Dr Agarwal's Eye Hospital Ltd ( PORUR )", "Trends Invogue Pvt Ltd ( JAYA NAGAR , BANGALORE )", "Vinayaka Associates ( KOVILABAKKAM & PERUMBAKKAM )", "New Designer Web Private Limited (FISERVE - CHENNAI )", "New Designer Web Private Limited ( FISERVE , MEETING TABLE - CHENNAI )", "TAFE - Tractors & Farm Equipment ( CHENNAI )", "Green Trends ( HBR LAYOUT , BANGALORE )", "Dr Agarwal's Eye Institute ( BISHOP GARDEN , CHENNAI )", "Dr Agarwal's Healthcare Ltd ( ADYAR )", "Dr Agarwal's Healthcare Ltd ( MOGAPAIR )", "Dr Agarwal's Eye Hospital Ltd ( MADURAI )", "Dr Agarwal's Healthcare Ltd ( KASBA , KOLKATA )", "Dr Agarwal's Healthcare Ltd ( WHITEFIELD , BANGALORE )", "Trends Invogue Pvt Ltd ( JEEVAN BHEEMA NAGAR )", "Opus Fashion Private Limited - Maybell ( EXPRESS AVENUE , CHENNAI )", "Dr Agarwal's Eye Insitute ( BOAT CLUB , ADYAR )", "Dr Agarwal's Eye Insitute ( POES GARDEN )", "Dr Agarwal's Eye Hospital Ltd ( ANNANAGAR )", "Green Trends ( VELLORE )", "Dr Agarwal's MD Residence ( POES GARDEN )", "Dr Agarwal's Eye Hospital Ltd ( PORUR )", "Dr Agarwal's Eye Hospital Ltd ( GREAMS ROAD , CHENNAI )", "Dr Agarwal's Eye Research Centre ( GREAMS ROAD , CHENNAI )", "Dr Agarwal's Healthcare Ltd ( INDIRANAGAR , BANGALORE )", "Opus Fashions Private Limited ( AMJIKARAI , CHENNAI )", "Nisa Enterprises ( TITAN - ROYAPURAM )", "Aditya Birla - People ( VIVERA MALL , CHENNAI )",
            "TAFE - Tractors & Farm Equipment ( CHENNAI )", "S S Enterprises ( KANURU , VIJAYAWADA )", "Aditya Birla - People ( VIVERA MALL , CHENNAI )", "Trends Invogue Pvt Ltd ( MURALI NAGAR , VIZAG )", "Aditya Birla - People ( VIVERA MALL , CHENNAI )", "Green Trends ( MURALI NAGAR , VIZAG )", "Oyster Projects ( CHENNAI )", "Aditya Birla - People ( VIVERA MALL - CHENNAI )", "Sai Shiva Enterprises ( GT - SARJAPUR ROAD , BANGALORE )", "Tractors & Farm Equipment ( CHENNAI )", "Cavinkare Pvt Ltd - Trends Division ( BHAVANIPURAM )", "Opus Fashions Pvt Ltd ( AMJIKARAI , CHENNAI )", "Aditya Birla - Planet Fashion ( NAVALUR , VIVERAMALL , CHENNAI )", "The Banyan (NGO) (CHENNAI)", "Aditya Birla - People ( VIVERA MALL , CHENNAI )", "Aditya Birla - People ( PHOENIX MALL , CHENNAI )", "TAFE - Tractors & Farm Equipment ( NUNGAMBAKKAM , CHENNAI )", "TAFE - Tractors & Farm Equioment ( PERAMBUR , SEMBIAM )", "Aditya Birla - People ( PHOENIX MALL , CHENNAI )", "Green Trends - Manipal County ( BANGALORE )", "Opus Fashions Private Limited ( KOVAI )", "Cavinkare Pvt Ltd - Green Trends ( VIJAYAWADA )", "Cavinkare Pvt Ltd - Green Trends ( PATTABIRAM , CHENNAI )", "Fitness One ( PATTABIRAM , CHENNAI )", "Intersteller Testing Centre Pvt Ltd ( PERUNGUDI , CHENNAI )", "Dr Agarwal's EYE Hospital Ltd ( GREAMS ROAD , CHENNAI )", "Green Trends ( SEMMANCHERY , CHENNAI )", "Green Trends ( PATTABIPURAM , GUNTUR )", "Fricon Engineers Pvt Ltd ( EKKADUTHANGAL )",
            "Dr Agarwal's Eye Hospital Ltd ( HOSUR )", "Dr Agarwal's Eye Hospital Ltd ( KRISHNAGIRI )", "Cavinkare Pvt Ltd - Trends Division ( LIMELITE - CHENNAI )", "Dr Agarwal's Eye Hospital Ltd ( CORPORATE OFFICE 3RD FLOOR - CHENNAI )", "Opus Fashions Private Limited ( VR MALL , CHENNAI )", "Green Trends ( PONDICHERRY )", "Green Trends ( MAMBAKKAM , CHENNAI )", "Dr Agarwal's Eye Hospital Ltd ( KORAMANGALA , BANGALORE )", "Green Trends - Renovation ( HARLUR , BANGALORE )", "Dr Agarwal's Eye Hospital Ltd ( ERODE )", "K Hotel ( PENUGONDA , ANDHRA PRADESH )", "Elixify ( Skin & hair Clinic )", "green trends (cheran ma nagar,coimbatore)", "Tafe Motors & Tractors Limited (BHOPAL)", "sundaram finance head office chennai", "Dr Aggarwal's Thanjavur", "green trends pollachi"
        ];

        $images = [
            "1486406146926-c627a92ad1ab", "1497366216548-37526070297c", "1497366811353-6870744d04b2",
            "1504384308090-c894fdcc538d", "1541829070764-84a7d30dd3f3", "1582407947304-fd86f028f716",
            "1497215728101-856f4ea42174", "1512917774080-9991f1c4c750", "1556761175-4b46a572b786"
        ];

        foreach ($completedRaw as $i => $rawTitle) {
            $title = trim(preg_replace('/^\\d+/', '', $rawTitle));
            
            // Determine Category and Badge
            $category = "Commercial";
            $badge = "COMPLETED";
            $lower = strtolower($title);
            
            if (Str::contains($lower, ['residencial', 'residence', 'house'])) {
                $category = "Residential";
            } elseif (Str::contains($lower, ['green trends', 'hotel', 'limelite', 'crocs', 'restaurant'])) {
                $category = "Hospitality";
            } elseif (Str::contains($lower, ['dr agarwal', 'laboratory', 'innovation', 'titan'])) {
                $category = "Luxe Detail";
            }

            // Image
            $imgId = $images[$i % 9];
            $imageUrl = "https://images.unsplash.com/photo-{$imgId}?auto=format&fit=crop&q=60&w=800&sig={$i}";

            DB::table('projects')->insert([
                'title' => $title,
                'location' => Str::contains($title, '(') ? Str::before(Str::after($title, '('), ')') : 'Chennai, India',
                'progress' => 100,
                'image_url' => $imageUrl,
                'description' => $title,
                'type' => $category,
                'status' => 'completed',
                'badge' => $badge,
                'is_featured' => ($i % 5 === 0), // Feature some
                'order_index' => $i + 10,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // 5. Seed Careers (Based on Career.tsx)
        $careers = [
            [
                'title' => 'Senior Project Manager',
                'department' => 'Project Management',
                'location' => 'Trichy',
                'salary' => 'Competitive',
                'image_url' => 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200',
                'specifications' => json_encode(["12–15 Years Experience", "Luxury Residential Background", "International Vendor Management"]),
            ],
            [
                'title' => 'Lead Interior Architect',
                'department' => 'Design Studio',
                'location' => 'Remote',
                'salary' => 'Industry Standard',
                'image_url' => 'https://cdn.pixabay.com/photo/2015/04/20/06/46/office-730681_1280.jpg',
                'specifications' => json_encode(["Concept to Execution", "Revit & Rhino Proficiency", "High-End FF&E Knowledge"]),
            ],
            [
                'title' => 'Visualizer (CGI)',
                'department' => 'Creative Team',
                'location' => 'Chennai',
                'salary' => 'Based on Portfolio',
                'image_url' => 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200',
                'specifications' => json_encode(["Unreal Engine Expertise", "Photorealistic Rendering", "3ds Max & V-Ray"]),
            ],
        ];

        foreach ($careers as $job) {
            DB::table('career_listings')->insert(array_merge($job, [
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }

        // 6. Seed Contact Details (Based on Footer.tsx & Contact.tsx)
        $contacts = [
            ['type' => 'phone', 'label' => 'Primary Contact', 'value' => '+91 8098085553, 8144555522', 'icon' => 'Phone', 'order_index' => 1],
            ['type' => 'email', 'label' => 'Sales Inquiry', 'value' => 'sales@arseninterior.in', 'icon' => 'Mail', 'order_index' => 2],
            [
                'type' => 'address', 
                'label' => 'Arsen Interio Pvt Ltd', 
                'value' => "#4, Noombal Road, Velappanchavadi\nChennai – 600 077.", 
                'icon' => 'MapPin', 
                'order_index' => 3
            ],
            [
                'type' => 'address', 
                'label' => 'Arsen Funritures & Fixtures', 
                'value' => "No.211/1B, Metro city phase 1,\nRajankuppam, Ayanambakkam,\nChennai - 600095", 
                'icon' => 'MapPin', 
                'order_index' => 4
            ],
            ['type' => 'social', 'label' => 'Facebook', 'value' => 'https://www.facebook.com/arseninterior.in/', 'icon' => 'Facebook', 'order_index' => 5],
            ['type' => 'social', 'label' => 'Twitter', 'value' => 'https://twitter.com/ArsenSenthil', 'icon' => 'Twitter', 'order_index' => 6],
            ['type' => 'social', 'label' => 'Instagram', 'value' => 'https://www.instagram.com/arseninterio/', 'icon' => 'Instagram', 'order_index' => 7],
            ['type' => 'social', 'label' => 'LinkedIn', 'value' => 'https://www.linkedin.com/company/13732875/', 'icon' => 'Linkedin', 'order_index' => 8],
        ];

        foreach ($contacts as $contact) {
            DB::table('contact_details')->insert(array_merge($contact, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
