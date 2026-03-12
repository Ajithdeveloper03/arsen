<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CmsDataSeeder extends Seeder
{
    public function run()
    {
        // 1. CLEAR TABLES
        DB::table('projects')->truncate();
        DB::table('banners')->truncate();
        DB::table('career_listings')->truncate();
        DB::table('contact_details')->truncate();

        $now = Carbon::now();

        // 2. SEED BANNERS (9 Slides from HeroCarousel)
        $banners = [
            ['badge' => 'PMC', 'title' => 'Technical Excellence', 'subtitle' => 'Global standards in precision and architectural integrity.', 'order_index' => 1, 'image_url' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop', 'link_text' => 'View Services', 'link_url' => '/pmc'],
            ['badge' => 'PMC', 'title' => 'Operational Synergy', 'subtitle' => 'Transforming complex blueprints into seamless reality.', 'order_index' => 2, 'image_url' => 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', 'link_text' => 'Learn More', 'link_url' => '/pmc'],
            ['badge' => 'PMC', 'title' => 'Strategic Oversight', 'subtitle' => 'Navigating large-scale developments with foresight.', 'order_index' => 3, 'image_url' => 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop', 'link_text' => 'Explore Projects', 'link_url' => '/completed'],
            ['badge' => 'COMMERCIAL', 'title' => 'Luminous Workspaces', 'subtitle' => 'Designing offices that breathe, inspire, and evolve.', 'order_index' => 4, 'image_url' => 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop', 'link_text' => 'See Projects', 'link_url' => '/commercial'],
            ['badge' => 'COMMERCIAL', 'title' => 'Corporate Identity', 'subtitle' => 'Manifesting brand values in every square inch.', 'order_index' => 5, 'image_url' => 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=2070&auto=format&fit=crop', 'link_text' => 'Our Solutions', 'link_url' => '/commercial'],
            ['badge' => 'COMMERCIAL', 'title' => 'Future-Ready Offices', 'subtitle' => 'Where technology meets artisanal craftsmanship.', 'order_index' => 6, 'image_url' => 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop', 'link_text' => 'Contact Us', 'link_url' => '/contact'],
            ['badge' => 'RESIDENTIAL', 'title' => 'Modern Sanctuaries', 'subtitle' => 'Crafting ultra-luxe homes with bespoke biophilic details.', 'order_index' => 7, 'image_url' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop', 'link_text' => 'Our Homes', 'link_url' => '/residential'],
            ['badge' => 'RESIDENTIAL', 'title' => 'Artisanal Interiors', 'subtitle' => 'Exclusive residential designs that define status.', 'order_index' => 8, 'image_url' => 'https://images.unsplash.com/photo-1600607687940-c52af04657b3?q=80&w=2070&auto=format&fit=crop', 'link_text' => 'Gallery', 'link_url' => '/residential'],
            ['badge' => 'RESIDENTIAL', 'title' => 'Urban Elegance', 'subtitle' => 'Minimalist luxury for the sophisticated global citizen.', 'order_index' => 9, 'image_url' => 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop', 'link_text' => 'Book Consult', 'link_url' => '/contact'],
        ];

        foreach ($banners as $b) {
            DB::table('banners')->insert(array_merge($b, [
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now
            ]));
        }

        // 3. SEED CAREERS (3 Vacancies)
        $careers = [
            [
                'title' => 'Senior Project Manager',
                'department' => 'Project Management',
                'location' => 'Trichy',
                'description' => 'We are seeking an experienced Project Manager to oversee large-scale interior projects from conception to completion.',
                'image_url' => 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200',
                'responsibilities' => json_encode(['Project planning and scheduling', 'Budget management', 'Team leadership', 'Quality control']),
                'skills' => json_encode(['Leadership', 'Strategic Planning', 'AutoCAD', 'MS Project']),
                'specifications' => json_encode(['12–15 Years Experience', 'Luxury Residential Background', 'International Vendor Management']),
                'is_active' => true,
            ],
            [
                'title' => 'Lead Interior Architect',
                'department' => 'Design',
                'location' => 'Remote / Chennai',
                'description' => 'Creative lead responsible for conceptualizing premium residential and commercial spaces.',
                'image_url' => 'https://cdn.pixabay.com/photo/2015/04/20/06/46/office-730681_1280.jpg',
                'responsibilities' => json_encode(['Space planning', 'Material selection', 'Client presentations', 'Design coordination']),
                'skills' => json_encode(['3ds Max', 'Revit', 'Creative Vision', 'SketchUp']),
                'specifications' => json_encode(['Concept to Execution', 'Revit & Rhino Proficiency', 'High-End FF&E Knowledge']),
                'is_active' => true,
            ],
            [
                'title' => 'Visualizer (CGI)',
                'department' => 'Visualization',
                'location' => 'Chennai',
                'description' => 'Produce high-end photo-realistic 3D renderings for our design projects.',
                'image_url' => 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200',
                'responsibilities' => json_encode(['3D modeling', 'Texturing and lighting', 'Rendering', 'Post-production']),
                'skills' => json_encode(['V-Ray', 'Corona Renderer', 'Photoshop', 'Unreal Engine']),
                'specifications' => json_encode(['Unreal Engine Expertise', 'Photorealistic Rendering', '3ds Max & V-Ray']),
                'is_active' => true,
            ],
        ];

        foreach ($careers as $c) {
            DB::table('career_listings')->insert(array_merge($c, [
                'created_at' => $now,
                'updated_at' => $now
            ]));
        }

        // 4. SEED CONTACT DETAILS
        $contacts = [
            ['type' => 'phone', 'label' => 'Main Office', 'value' => '+91 80980 85553', 'icon' => 'Phone', 'order_index' => 1],
            ['type' => 'phone', 'label' => 'Sales Enquiry', 'value' => '+91 81445 55522', 'icon' => 'PhoneCall', 'order_index' => 2],
            ['type' => 'email', 'label' => 'General Email', 'value' => 'sales@arseninterior.in', 'icon' => 'Mail', 'order_index' => 3],
            ['type' => 'map', 'label' => 'Arsen Interio Pvt Ltd', 'value' => '#4, Noombal Road, Velappanchavadi Chennai – 600 077.', 'icon' => 'MapPin', 'order_index' => 4],
            ['type' => 'map', 'label' => 'Arsen Furnitures & Fixtures', 'value' => 'No.211/1B, Metro city phase 1, Rajankuppam, Ayanambakkam, Chennai - 600095', 'icon' => 'Factory', 'order_index' => 5],
            ['type' => 'social', 'label' => 'Instagram', 'value' => 'https://www.instagram.com/arseninterior/', 'icon' => 'Instagram', 'order_index' => 6],
            ['type' => 'social', 'label' => 'Facebook', 'value' => 'https://www.facebook.com/ArsenInteriors', 'icon' => 'Facebook', 'order_index' => 7],
            ['type' => 'social', 'label' => 'LinkedIn', 'value' => 'https://www.linkedin.com/company/arsen-interior-designer-and-contractors/', 'icon' => 'Linkedin', 'order_index' => 8],
        ];

        foreach ($contacts as $con) {
            DB::table('contact_details')->insert(array_merge($con, [
                'created_at' => $now,
                'updated_at' => $now
            ]));
        }

        // 5. SEED PROJECTS (Ongoing + Featured + Archive)
        
        // Ongoing
        $ongoing = [
            ['title' => 'Sundaram Finance Pvt Ltd, Branch Office', 'location' => 'Ernakullam 2', 'progress' => 60, 'type' => 'Commercial', 'description' => 'Comprehensive structural revamping and interior fit-out for corporate branch operations.'],
            ['title' => 'Maxivision Super Speciality Eye Hospital', 'location' => 'Thirupathi', 'progress' => 45, 'type' => 'Luxe Detail', 'description' => 'Specialized healthcare interior fit-out focusing on sterile patient-flow optimization.'],
            ['title' => 'GMMCO, Sales Office', 'location' => 'Salem', 'progress' => 30, 'type' => 'Commercial', 'description' => 'Modern sales environment designed for corporate identity and client engagement.'],
            ['title' => 'GMMCO, Sales Office', 'location' => 'Nelamanga, Karnataka', 'progress' => 25, 'type' => 'Commercial', 'description' => 'Full-scale industrial administrative interiors for regional sales operations.'],
            ['title' => 'Premium Saloon', 'location' => 'Mogappair', 'progress' => 80, 'type' => 'Hospitality', 'description' => 'Luxury wellness and beauty salon featuring premium finishes and brand-centric design.'],
        ];

        foreach ($ongoing as $idx => $p) {
            DB::table('projects')->insert(array_merge($p, [
                'status' => 'ongoing',
                'order_index' => $idx,
                'image_url' => '', // Default empty string to avoid SQL error
                'created_at' => $now,
                'updated_at' => $now
            ]));
        }

        // Featured Completed
        $featured = [
            ['title' => 'Windsor Garden', 'type' => 'Residential', 'location' => 'Bangalore', 'description' => 'Classic architectural lines with modern sustainable tech.', 'is_featured' => true, 'image_url' => ''],
            ['title' => 'Sunil Reddy Residence', 'type' => 'Residential', 'location' => 'Hyderabad', 'description' => 'Bespoke woodwork and floor-to-ceiling glass transitions.', 'is_featured' => true, 'image_url' => ''],
            ['title' => 'MR.tharun Residential', 'type' => 'Residential', 'location' => 'Hyderabad', 'description' => 'Maximizing light in compact luxury through smart-glass.', 'is_featured' => true, 'image_url' => ''],
            ['title' => 'Saf Games Village', 'type' => 'Residential', 'location' => 'Chennai', 'description' => 'Monolithic luxury with private infinity gardens.', 'is_featured' => true, 'image_url' => ''],
            ['title' => 'Sunil Reddy Residential', 'type' => 'Residential', 'location' => 'Hyderabad', 'description' => 'An avant-garde industrial masterpiece.', 'is_featured' => true, 'image_url' => ''],
            ['title' => 'Sundaram Finance', 'type' => 'Commercial', 'location' => 'Chennai', 'description' => 'Premium corporate headquarters featuring acoustically treated conference wings.', 'is_featured' => true, 'image_url' => 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069'],
            ['title' => 'Tafe', 'type' => 'Commercial', 'location' => 'Chennai', 'description' => 'Industrial-themed administrative blocks and collaborative cafes.', 'is_featured' => true, 'image_url' => 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070'],
            ['title' => 'Oecl', 'type' => 'Commercial', 'location' => 'Chennai', 'description' => 'A massive 45,000 sq.ft agile workspace focusing on open-plan collaboration.', 'is_featured' => true, 'image_url' => 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=2070'],
            ['title' => 'Green Trends', 'type' => 'Commercial', 'location' => 'Multiple Locations', 'description' => 'Rapid-deployment turnkey fit-outs for salon chains.', 'is_featured' => true, 'image_url' => 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2074'],
            ['title' => 'Aditya Birla (People)', 'type' => 'Commercial', 'location' => 'Multiple Locations', 'description' => 'Retail infrastructure partner for 28 fashion outlets across India.', 'is_featured' => true, 'image_url' => 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070'],
            ['title' => 'Temenos – KG360', 'type' => 'Commercial', 'location' => 'Perungudi, Chennai', 'description' => 'IT Business Park workspace design and fit-out.', 'is_featured' => true, 'image_url' => 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069'],
        ];

        foreach ($featured as $idx => $fb) {
            DB::table('projects')->insert(array_merge([
                'image_url' => '',
                'is_featured' => false
            ], $fb, [
                'status' => 'completed',
                'progress' => 100,
                'order_index' => $idx + 10,
                'created_at' => $now,
                'updated_at' => $now
            ]));
        }

        // Archive Titles (COMPREHENSIVE LIST: 283 Projects)
        $archiveTitles = [
            "Capital Profit ( ERODE )",
            "World of Titan ( ERODE)",
            "JLR - Jaguar and Land Rover Show room ( JUBILEE HILLS , HYDERABAD )",
            "JLR - Jaguar and Land Rover Service Centre ( KOTHAGUDA , HYDERABAD )",
            "Crocs ( EXPRESS AVENUE , CHENNAI )",
            "World of Titan ( TIRUPPUR)",
            "Titan Eye Plus ( TIRUPPUR )",
            "Titan Eye Plus ( ERODE)",
            "Johnson Tiles ( KARUR )",
            "Aditya Birla - People ( PREMIER PLAZA , PIMPRI , PUNE )",
            "World of Titan ( PERAMBUR , CHENNAI )",
            "Titan Eye Plus ( PERAMBUR , CHENNAI )",
            "Titan Eye Plus Odyssey ( TRICHY )",
            "Fasttrack Odyssey ( TRICHY )",
            "Mr Venkatesh Residencial @ KK NAGAR",
            "Aditya Birla - People ( AMANORA MALL , PUNE )",
            "Aditya Birla - People ( KOLHAPUR , MAHARASTRA )",
            "Aditya Birla - People ( PREMIER PLAZA , PIMPRI , PUNE )",
            "Aditya Birla - People ( NASIK , MAHARASTRA )",
            "BVCPS - Bureau Veritas Consumer Product Service ( CHENNAI )",
            "Aditya Birla - People ( HASSAN , KARNATAKA )",
            "Titan Innovation Centre ( IITM , CHENNAI )",
            "BVCPS - Bureau Veritas Consumer Product Service ( CHENNAI )",
            "Titan Innovation Centre ( IITM , CHENNAI )",
            "Aditya Birla - People ( HUBLI , KARNATAKA )",
            "Aditya Birla - People ( NASIK , MAHARASTRA )",
            "Sargam Laboratory ( CHENNAI )",
            "Titan Innovation Centre ( IITM , CHENNAI )",
            "Aditya Birla - People ( INDRA NAGAR , BANGALORE )",
            "BVCPS - Bureau Veritas Consumer Product Service ( CHENNAI )",
            "Aditya Birla - People ( BRIGADE ROAD , BANGALORE )",
            "Aditya Birla - People ( JAYA NAGAR , BANGALORE )",
            "Asahi India ( SRIPERUMBUDUR , KANCHIPURAM )",
            "Fastrack ( ROYAPURAM , CHENNAI )",
            "Asahi India ( SRIPERUMBUPUR , KANCHIPURAM )",
            "Titan Industries - HELIOS ADNL ( CHENNAI )",
            "Titan Innovation Centre ( IITM - CHENNAI )",
            "Aditya birla - People ( JAYA NAGAR , BANGALORE )",
            "TAFE - Tractor and Form Equipments ( CHENNAI )",
            "Asahi India ( SRIPERUMPUDUR , KANCHIPURAM )",
            "Titan Area Office ( T.NAGAR )",
            "Titan Industries Limited ( TANISHQ , T.NAGAR )",
            "Aditya Birla Nuvo Ltd - People ( INDIRA NAGAR , BANGALORE )",
            "Aditya Birla Nuvo Ltd - People ( BRIGADE ROAD , BANGALORE )",
            "Aditya Birla - People ( CMH ROAD , BANGALORE )",
            "Titan Industries Limited ( AREA OFFICE , T.NAGAR )",
            "Fastrack ( CATHEDRAL ROAD , CHENNAI )",
            "Sargam Laboratory Pvt Ltd ( CHENNAI )",
            "Aditya Birla - People ( AUNDH , PUNE )",
            "Green Trends ( VELACHERRY , CHENNAI )",
            "Aditya Birla - People ( AUNDH , PUNE )",
            "Green Trends ( KOTTURPURAM , CHENNAI )",
            "Titan Industries Ltd - Area Office ( T.NAGAR )",
            "Aditya Birla - People ( HASSAN , KARNATAKA )",
            "Green Trends ( KOVILAMBAKKAM , CHENNAI )",
            "BVCPS - Bureau Veritas Consumer Products Services ( CHENNAI )",
            "Aditya Birla - People ( VIDYARANYAPURA , BANGALORE )",
            "Aditya Birla - People ( DAVANAGERE , BANGALORE )",
            "Green Trends ( R V ROAD , CHENNAI )",
            "Green Trends ( BANJARA HILLS , HYDERABAD )",
            "Aditya Birla - People ( BEL , KORAMANGALA , BANGALORE )",
            "Aditya Birla - People ( BANGALORE )",
            "Aditya Birla - People ( COMMERCIAL STREET-2 , BANGALORE )",
            "Fastrack ( R.K.SALAI , CHENNAI )",
            "Green Trends ( AOC , HYDERABAD )",
            "Aditya Birla - People ( WHITEFEILD , BANGALORE )",
            "Max Power Services ( CHENNAI )",
            "Green Trends ( SOUTH BOAG ROAD , CHENNAI )",
            "Limelite ( JAYANAGAR , BANGALORE )",
            "Aditya Birla - People ( GOPALAN INNOVATION MALL , BANGALORE )",
            "Aditya Birla - People ( J.P.NAGAR , MAINTENANCE , BANGALORE )",
            "Titan Company Limited ( TANISHQ GRANITE , T.NAGAR )",
            "Titan Company Limited ( CATHDERAL ROAD ))",
            "Aditya Birla - People ( FORUM VALUE MALL )",
            "World Of Titan ( ACS , PONDY BAZZAR - WOT )",
            "World Of Titan ( ACS , PONDY BAZZAR - WCC )",
            "World Of Titan - Electrical ( ACS , PONDY BAZZAR , WOT )",
            "World Of Titan - Electrical ( ACS , PONDY BAZZAR , WCC )",
            "Aditya Birla - People ( KORAMANGALA , BANGALORE )",
            "Limelite - Maintenance ( JAYANAGAR )",
            "Aditya Birla - People ( DAVANEGARE , BANGALORE )",
            "Aditya Birla - People ( MG ROAD , BANGALORE )",
            "Green Trends ( ANNANAGAR , CHENNAI )",
            "World Of Titan ( PERAMBUR , CHENNAI )",
            "Green Trends ( PERUNGUDI , CHENNAI )",
            "Green Trends ( PERUMBAKKAM , CHENNAI )",
            "Titan Company Limited ( PONDYBAZAR , CHENNAI )",
            "Petrofac Engg Services (I) Pvt Ltd ( CHENNAI )",
            "Aditya Birla - People ( SKYWALK , CHENNAI )",
            "Green Trends ( ROYAPURAM , CHENNAI )",
            "Petrofac Engg Services (I) Pvt Ltd , 1 St Floor ( CHENNAI )",
            "Green Trend ( PALAKKAD , KERALA )",
            "Petrofac Engg Services (I) Pvt Ltd ( CHENNAI )",
            "Green Trends ( VIVEKANANDA NAGAR , HYDERABAD )",
            "Green Trends ( MOGALRAJPURAM , VIJAYAWADA )",
            "Green Trends ( VIVEKANANDA NAGAR , HYDERABAD )",
            "Green Trends ( LAKSHMI NAGAR , GUNTUR )",
            "Asahi India Glass Limited ( KANCHIPURAM )",
            "Aditya Birla - People ( YELAHANKA , BANGALORE )",
            "Green Trends ( SOUTH BOAG ROAD , CHENNAI )",
            "Aditya Birla - People ( YELAHANKA NEW TOWN , BANGALORE )",
            "New Designer Web Private Limited ( CHENNAI )",
            "Aditya Birla - People ( YELAHANKA NEW TOWN , BANGALORE )",
            "Fastrack ( TRICHY )",
            "Green Trends ( ATTAPUR , HYDERABAD )",
            "Dr Agarwal's Eye Hospital Ltd ( PORUR - CHENNAI )",
            "Dr Agarwal's Healthcare Ltd ( CHETPET , CHENNAI )",
            "Green Trends ( SINDHI COLONY , HYDERABAD )",
            "Petrofac Engg Services (I) Pvt Ltd ( CHENNAI )",
            "Aditya Birla - People ( INDIRANAGAR , BANGALORE )",
            "Dr Agarwal's Healthcare Limited ( TIRUNELVELI )",
            "Dr Agarwal's Eye Hospital Ltd ( CATHEDRAL ROAD , CHENNAI )",
            "Dr Agarwal's Healthcare Ltd ( BANNERGHATTA , BANGALORE )",
            "Green Trends ( KUKATPALLY , HYDERABAD )",
            "Dr Agarwals Healthcare Ltd ( ADAYAR )",
            "Green Trends ( BANASHANKARI , BANGALORE )",
            "Vinayaka Associates ( KOVILAMBAKKAM )",
            "TAFE - Tractors & Farm Equipment ( NUNGAMBAKKAM )",
            "Green Trends ( MANIGONDA , HYDERABAD )",
            "Green Trends ( KOVILAMBAKKAM , CHENNAI )",
            "Mr.Charls Pradeep Paul - Residential ( CHENNAI )",
            "Green Trends ( C.V.RAMAN NAGAR , CHENNAI )",
            "Green Trends ( D.D.COLONY , HYDERABAD )",
            "TAFE - Tractors & Farm Equipment ( R.K.SALAI )",
            "TAFE - Tractors & Farm Equipment ( NUNGAMBAKKAM )",
            "Dr Agarwal's Healthcare Ltd ( BANNERGHATTA , BANGALORE )",
            "Dr Agarwal's Healthcare Ltd ( ADYAR )",
            "Aditya Birla - People ( HASSAN )",
            "BVCPS - Bureau Veritas Consumer Products Services ( GUINDY , CHENNAI )",
            "Dr Agarwal's Healthcare Ltd ( TRIPLICANE )",
            "TAFE - Tractors & Farm Equipment ( NUNGAMBAKKAM )",
            "Green Trends ( BAGALUR ROAD , HOSUR )",
            "Aumento Ventures ( BANGALORE )",
            "I Gate Global Solutions Ltd ( CHENNAI )",
            "Dr Agarwal's Eye Hospital Ltd ( CHENNAI )",
            "Green Trends ( BANASHANKARI , BANGALORE )",
            "Dr Agarwal's Eye Hospital Ltd ( PORUR )",
            "Dr Agarwal's Eye Hospital Ltd ( ASHOKNAGAR )",
            "Green Trends ( KOVILAMBAKKAM , CHENNAI )",
            "TAFE - Tractors & Farm Equipment ( CHENNAI )",
            "Dr Agarwal's Eye Hospital Ltd ( ANNANAGAR )",
            "New Designer Web Pvt Ltd ( KRIZZ - BANGALORE )",
            "Trends Invogue Pvt Ltd ( HSR LAYOUT )",
            "New Designer Web Private Limited ( CHENNAI )",
            "Green Trends ( MADAMBAKKAM , CHENNAI )",
            "Dr Agarwal's Healthcare Ltd ( ADAYAR )",
            "Dr Agarwal's Eye Hospital Ltd ( PORUR )",
            "Dr Agarwal's Eye Institute ( BISHOP GARDEN , CHENNAI )",
            "Green Trends ( SINDHI COLONY , HYDERABAD )",
            "Green Trends (SOUTH BOAG ROAD , CHENNAI )",
            "Dr Agarwal's Healthcare Ltd ( WHITE FIELD , BANGALORE )",
            "Dr Agarwal Healthcare Ltd ( TRICHY )",
            "Limelite - Banashankari ( BANGALORE )",
            "BVCPS - Bureau Veritas Consumer Products Services ( CHENNAI )",
            "Aumento Ventures ( BANGALORE )",
            "New Designer Web Private Limited ( FISERVE - CHENNAI )",
            "Dr Agarwal's Eye Hospital Ltd ( GUINDY , CHENNAI )",
            "World Of Titan ( PERAMBUR , CHENNAI )",
            "TAFE - Tractors & Farm Equipment ( CHENNAI )",
            "Dr Agarwal's Eye Research Centre ( GREAMS ROAD , CHENNAI )",
            "Dr Agarwal's Eye Hospital Ltd ( PORUR )",
            "Trends Invogue Pvt Ltd ( JAYA NAGAR , BANGALORE )",
            "Vinayaka Associates ( KOVILABAKKAM & PERUMBAKKAM )",
            "New Designer Web Private Limited (FISERVE - CHENNAI )",
            "New Designer Web Private Limited ( FISERVE , MEETING TABLE - CHENNAI )",
            "TAFE - Tractors & Farm Equipment ( CHENNAI )",
            "Green Trends ( HBR LAYOUT , BANGALORE )",
            "Dr Agarwal's Eye Institute ( BISHOP GARDEN , CHENNAI )",
            "Dr Agarwal's Healthcare Ltd ( ADAYAR )",
            "Dr Agarwal's Healthcare Ltd ( MOGAPAIR )",
            "Dr Agarwal's Eye Hospital Ltd ( MADURAI )",
            "Dr Agarwal's Healthcare Ltd ( KASBA , KOLKATA )",
            "Dr Agarwal's Healthcare Ltd ( WHITEFIELD , BANGALORE )",
            "Trends Invogue Pvt Ltd ( JEEVAN BHEEMA NAGAR )",
            "Opus Fashion Private Limited - Maybell ( EXPRESS AVENUE , CHENNAI )",
            "Dr Agarwal's Eye Insitute ( BOAT CLUB , ADYAR )",
            "Dr Agarwal's Eye Insitute ( POES GARDEN )",
            "Dr Agarwal's Eye Hospital Ltd ( ANNANAGAR )",
            "Green Trends ( VELLORE )",
            "Dr Agarwal's MD Residence ( POES GARDEN )",
            "Dr Agarwal's Eye Hospital Ltd ( PORUR )",
            "Dr Agarwal's Eye Hospital Ltd ( GREAMS ROAD , CHENNAI )",
            "Dr Agarwal's Eye Research Centre ( GREAMS ROAD , CHENNAI )",
            "Dr Agarwal's Healthcare Ltd ( INDIRANAGAR , BANGALORE )",
            "Opus Fashions Private Limited ( AMJIKARAI , CHENNAI )",
            "Nisa Enterprises ( TITAN - ROYAPURAM )",
            "Aditya Birla - People ( VIVERA MALL , CHENNAI )",
            "TAFE - Tractors & Farm Equipment ( CHENNAI )",
            "S S Enterprises ( KANURU , VIJAYAWADA )",
            "Aditya Birla - People ( VIVERA MALL , CHENNAI )",
            "Trends Invogue Pvt Ltd ( MURALI NAGAR , VIZAG )",
            "Aditya Birla - People ( VIVERA MALL , CHENNAI )",
            "Green Trends ( MURALI NAGAR , VIZAG )",
            "Oyster Projects ( CHENNAI )",
            "Aditya Birla - People ( VIVERA MALL - CHENNAI )",
            "Sai Shiva Enterprises ( GT - SARJAPUR ROAD , BANGALORE )",
            "Tractors & Farm Equipment ( CHENNAI )",
            "Cavinkare Pvt Ltd - Trends Division ( BHAVANIPURAM )",
            "Opus Fashions Pvt Ltd ( AMJIKARAI , CHENNAI )",
            "Aditya Birla - Planet Fashion ( NAVALUR , VIVERAMALL , CHENNAI )",
            "The Banyan (NGO) (CHENNAI)",
            "Aditya Birla - People ( VIVERA MALL , CHENNAI )",
            "Aditya Birla - People ( PHOENIX MALL , CHENNAI )",
            "TAFE - Tractors & Farm Equipment ( NUNGAMBAKKAM , CHENNAI )",
            "TAFE - Tractors & Farm Equioment ( PERAMBUR , SEMBIAM )",
            "Aditya Birla - People ( PHOENIX MALL , CHENNAI )",
            "Green Trends - Manipal County ( BANGALORE )",
            "Opus Fashions Private Limited ( KOVAI )",
            "Cavinkare Pvt Ltd - Green Trends ( VIJAYAWADA )",
            "Cavinkare Pvt Ltd - Green Trends ( PATTABIRAM , CHENNAI )",
            "Fitness One ( PATTABIRAM , CHENNAI )",
            "Intersteller Testing Centre Pvt Ltd ( PERUNGUDI , CHENNAI )",
            "Dr Agarwal's EYE Hospital Ltd ( GREAMS ROAD , CHENNAI )",
            "Green Trends ( SEMMANCHERY , CHENNAI )",
            "Green Trends ( PATTABIPURAM , GUNTUR )",
            "Fricon Engineers Pvt Ltd ( EKKADUTHANGAL )",
            "Dr Agarwal's Eye Hospital Ltd ( HOSUR )",
            "Dr Agarwal's Eye Hospital Ltd ( KRISHNAGIRI )",
            "Cavinkare Pvt Ltd - Trends Division ( LIMELITE - CHENNAI )",
            "Dr Agarwal's Eye Hospital Ltd ( CORPORATE OFFICE 3RD FLOOR - CHENNAI )",
            "Opus Fashions Private Limited ( VR MALL , CHENNAI )",
            "Green Trends ( PONDICHERRY )",
            "Green Trends ( MAMBAKKAM , CHENNAI )",
            "Dr Agarwal's Eye Hospital Ltd ( KORAMANGALA , BANGALORE )",
            "Green Trends - Renovation ( HARLUR , BANGALORE )",
            "Dr Agarwal's Eye Hospital Ltd ( ERODE )",
            "K Hotel ( PENUGONDA , ANDHRA PRADESH )",
            "Elixify ( Skin & hair Clinic )",
            "green trends (cheran ma nagar,coimbatore)",
            "Tafe Motors & Tractors Limited (BHOPAL)",
            "Sundaram finance head office chennai",
            "Dr Agarwal's Eye Hospital Ltd Thanjavur",
            "green trends pollachi",
            "OECL Chennai Annanagar ",
            "SANTHI HOSPITAL SHENOY NAGR",
            "Aarcus Automation Chennai",
            "CASAGRAND BLOOM Pallikarani (model Villa)",
            "Dr Agarwal's Eye Hospital Ltd  (Porur)",
            "Tafe Corporate Office Nungampakkam ",
            "The  creams Icecream Paurlour Ambattur Ot ",
            "Sundaram Infotech Corporate Office  chennai",
            "Dr Agarwal's Eye Hospital Ltd  (Hydrabad )",
            "Dr Agarwal's Eye Hospital Ltd  (Pudukottai )",
            "Dr Agarwal's Eye Hospital Ltd  (Kanchipuram)",
            "Dr Agarwal's Eye Hospital Ltd  (Vizhuppuram)",
            "Dr Agarwal's Eye Hospital Ltd  (Aavadi )",
            "Dr Agarwal's Eye Hospital Ltd  ( Rasipuram )",
            "Sundaram Finance Pvt Ltd, Branch Office (Pune)",
            "Super Auto Forge (Kanchipuram)",
            "Sundaram Finance Pvt Ltd, Branch Office (Ernakullam )",
            "Sundaram Finance Pvt Ltd, Branch Office (AJMER )",
            "Sundaram Finance Pvt Ltd, Branch Office (Indore )",
            "Sundaram Home Corporate Office (Sundaram Towers) Chennai",
            "Unominda Industries Limited (Irungattukottai)",
            "Sundaram Home  Pvt Ltd Branch Office @ 15 Patulous Chennai",
            "Hyundai GLOVIS India Pvt. Ltd. –Corporate Office Chennai",
            "BYD India Private Limited - Modular Furniture's (Irungattukottai) ",
            "Sundaram Finance Pvt Ltd, Branch Office Hydrabad",
            "Sundaram Finance Pvt Ltd, Branch Office Amirpet ,Telangana",
            "Sundaram Finance Pvt Ltd, Branch Office Bhopal , Madhya Pradesh",
            "Sundaram Home  Pvt Ltd Branch Office @ 15 Patulous Chennai",
            "Sunshine Hostel - Aminjakari chennai",
            "Sundaram Finance Pvt Ltd, Branch Office Belgaum , Karnataka",
            "Sundaram Finance Pvt Ltd, Branch Office  Thanjavur",
            "Sundaram Finance Pvt Ltd, Branch Office  Ghatkaser,Telangana",
            "Sundaram Finance Pvt Ltd, Branch Office  Hasan, Karnataka ",
            "Dr Agarwal's Eye Hospital Ltd  (Karur)",
            "Sundaram Home Pvt Ltd Branch Office @ LB Nagar, Hydrabad ",
            "Dr Agarwal's Eye Hospital Ltd, Corporate Office- Chennai.",
            "Sundaram Home Pvt Ltd Branch Office @ LB Nagar, Begumpet ",
            "Sunshine Hostel - T-Nagar Chennai",
            "Sundaram Finance Pvt Ltd, Branch Office ,Dharmapuri",
            "Sundaram Finance Pvt Ltd, Branch Office, Angamally, Kerala ",
            "Sundaram Finance Pvt Ltd, Branch Office, @ 169 Alamelu Towers Chennai",
            "Neelima parlapalli skin and laser clinic, Thirupathi ",
            "Sundaram Finance Pvt Ltd, Branch Office @Nashik, Maharashtra",
            "Sundaram Home Pvt Ltd Branch Office @Kottayam, Kerala",
            "Sundaram Finance Pvt Ltd, Branch Office @ Thirur,Kerala",
            "Temenos India Pvt Ltd in Perungudi, Chennai",
            "Sundaram Finance Pvt Ltd, Branch Office Pantery Revamping @ 21 Patulous, Chennai",
            "Sundaram Finance Pvt Ltd, Branch Office Restroom Revamping @ 21 Patulous , Chennai",
            "Sundaram Finance Pvt Ltd, Branch Office Restroom Revamping @ 15 Patulous , Chennai"
        ];

        foreach ($archiveTitles as $idx => $fullTitle) {
            $cleanTitle = preg_replace('/^\d+\s+/', "", $fullTitle);
            $location = "India";
            if (str_contains($fullTitle, '(')) {
                $parts = explode('(', $fullTitle);
                $location = trim(end($parts), " )");
            }

            DB::table('projects')->insert([
                'title' => $cleanTitle,
                'location' => $location,
                'type' => 'Commercial', // Fallback
                'status' => 'completed',
                'progress' => 100,
                'description' => 'Archive Project',
                'image_url' => '', // Default empty string to avoid SQL error
                'order_index' => $idx + 50,
                'created_at' => $now,
                'updated_at' => $now
            ]);
        }
    }
}
