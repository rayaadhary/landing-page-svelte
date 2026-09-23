import 'dotenv/config';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import {
	users,
	sessions,
	hero,
	products,
	features,
	testimonials,
	faqs,
	blogPosts,
	settings
} from './schema.js';
import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
	throw new Error('DATABASE_URL is not set');
}

const client = postgres(DATABASE_URL);
const db = drizzle(client);

async function hashPassword(password) {
	const salt = randomBytes(16).toString('hex');
	const buf = await scryptAsync(password, salt, 64);
	return `${salt}:${buf.toString('hex')}`;
}

const heroData = {
	titlePrefix: 'Jasa Pembuatan',
	titleHighlight: 'Aplikasi & Software Kustom',
	highlightColor: '#0155FF',
	description:
		'Dari ERP, SIMRS, HRIS, hingga POS retail. Kami bantu digitalisasi operasional bisnis Anda dengan sistem scalable, aman, dan harga fleksibel.',
	ctaPrimaryLabel: 'Konsultasi Gratis',
	ctaPrimaryHref: '',
	ctaSecondaryLabel: 'Lihat Produk',
	ctaSecondaryHref: '#layanan',
	stats: [
		{ value: '100%', label: 'Custom Solution' },
		{ value: '100%', label: 'On-Time Delivery' },
		{ value: '1 Tahun', label: 'Garansi Maintenance' },
		{ value: '24/7', label: 'Support & Service' }
	]
};

const productsData = [
	{
		slug: 'simrs',
		title: 'SIMRS Core Enterprise',
		category: 'HEALTHCARE SYSTEM',
		overview:
			'Solusi transformasi digital menyeluruh untuk manajemen Rumah Sakit skala besar. Menyinkronkan seluruh alur kerja klinis, operasional, hingga administrasi keuangan dalam satu pusat data terpadu.',
		screenshots: ['/assets/hospital2.png'],
		modules: [
			'Pendaftaran & Antrean Multi-Layanan',
			'Rekam Medis Elektronik (EMR) Kemenkes',
			'Pelayanan Medis IGD & Rawat Inap',
			'Laboratorium & Radiologi (RIS/PACS)',
			'Modul Farmasi & E-Prescribing',
			'Billing System & Integrasi BPJS VClaim'
		],
		pricing: [
			{
				name: 'Pratama Tier',
				price: 'Rp 4.9jt / bln',
				highlights: [
					'Akses 30 User Eksternal',
					'Bridging BPJS & SatuSehat',
					'Standard Cloud Database',
					'Jam Kerja Support (08.00 - 17.00)'
				]
			},
			{
				name: 'Enterprise Tier',
				price: 'Rp 14.5jt / bln',
				highlights: [
					'Unlimited User & Staff',
					'Full Modul RIS/PACS & IGD',
					'Dedicated Server VPS High-Spec',
					'24/7 Priority Engineer Support'
				]
			},
			{
				name: 'Custom Hospital Node',
				price: 'Custom Quote',
				highlights: [
					'On-Premise Infrastructure Deployment',
					'Custom Modul sesuai Perda / Grand Design',
					'Source Code Ownership Option',
					'In-House IT Team Training Service'
				]
			}
		],
		sortOrder: 0
	},
	{
		slug: 'sim-klinik',
		title: 'SIM Klinik Pratama & Utama',
		category: 'HEALTHCARE SYSTEM',
		overview:
			'Sistem manajemen klinik modern multi-cabang yang dirancang end-to-end untuk memotong birokrasi pendaftaran yang lambat dan mengontrol rekam medis pasien.',
		screenshots: ['/assets/clinic2.png'],
		modules: [
			'Portal Reservasi Online & Janji Pasien',
			'Pencatatan Rekam Medis Ringkas (RME)',
			'Live Inventory Obat & Alat Kesehatan',
			'Kasir Billing Mandiri',
			'Sistem Notifikasi WhatsApp Otomatis',
			'Laporan Operasional & Margin'
		],
		pricing: [
			{
				name: 'Starter Node',
				price: 'Rp 850rb / bln',
				highlights: [
					'Maksimal 2 Cabang Klinik',
					'RME Standar Kemenkes RI',
					'Modul Kasir & Stok Dasar',
					'Email Support Level 1'
				]
			},
			{
				name: 'Multi-Branch Pro',
				price: 'Rp 2.2jt / bln',
				highlights: [
					'Unlimited Cabang & Multi-Gudang',
					'Notifikasi Integrasi WhatsApp Gateway',
					'Sinkronisasi Dashboard Keuangan',
					'Premium Cloud Backup 2x Sehari'
				]
			},
			{
				name: 'Corporate Grid',
				price: 'Custom Quote',
				highlights: [
					'White-Label Application Branding',
					'SLA Uptime Guarantee 99.99%',
					'Dedicated Database Cluster',
					'Dedicated Account Manager Dedicated'
				]
			}
		],
		sortOrder: 1
	},
	{
		slug: 'hris',
		title: 'HRIS Smart Corporate',
		category: 'BUSINESS ENTERPRISE',
		overview:
			'Sistem manajemen SDM cerdas berbasis cloud untuk mengotomatisasi seluruh administrasi personalia, kehadiran biometrik, hingga kalkulasi payroll perusahaan Anda.',
		screenshots: ['/assets/hris.png'],
		modules: [
			'Absensi Biometrik & Anti-Fake GPS',
			'Manajemen Penjadwalan & Multi-Shift',
			'Kalkulator Payroll Otomatis & PPh 21',
			'Portal Mandiri Karyawan (ESS App)',
			'Dashboard Manajemen Performa Staf',
			'Audit Logging & Role Permission'
		],
		pricing: [
			{
				name: 'Basic Team',
				price: 'Rp 1.2jt / bln',
				highlights: [
					'Maksimal 50 Karyawan Aktif',
					'Fitur Presensi GPS & ESS App',
					'Kalkulasi Gaji Standar',
					'SLA Response 12 Jam'
				]
			},
			{
				name: 'Growth Scale',
				price: 'Rp 3.5jt / bln',
				highlights: [
					'Hingga 500 Karyawan Aktif',
					'Kalkulator Pajak PPh 21 & BPJS Tk/Kes',
					'Multi-Shift Scheduling Logika Rumit',
					'Dedicated Chat Support Channel'
				]
			},
			{
				name: 'Conglomerate Node',
				price: 'Custom Quote',
				highlights: [
					'Unlimited Employee & Subsidiaries',
					'Custom API Core HR Integration',
					'On-Premise Server Hybrid Support',
					'Annual Compliance Audit Assistance'
				]
			}
		],
		sortOrder: 2
	},
	{
		slug: 'pos-inventory',
		title: 'POS & Intelligent Inventory',
		category: 'RETAIL & COMMERCE',
		overview:
			'Aplikasi kasir pintar serbaguna untuk mengamankan arus pendapatan dan mengoptimalkan manajemen stok multi-gudang pada bisnis retail, grosir, maupun F&B.',
		screenshots: ['/assets/pos.png'],
		modules: [
			'Aplikasi Kasir Omnichannel & QRIS',
			'Manajemen Inventori Multi-Gudang',
			'Deteksi Otomatis Expired Date & Slow-Moving',
			'Penyesuaian Skema Harga Grosir / Eceran',
			'Dashboard Keuangan Laba Rugi Komprehensif',
			'Integrasi API Printer & Barcode Scanner'
		],
		pricing: [
			{
				name: 'Retail Shop',
				price: 'Rp 450rb / bln',
				highlights: [
					'1 Lokasi Toko / Outlet',
					'Aplikasi Kasir Support Offline',
					'Laporan Penjualan Standar',
					'Community Support Access'
				]
			},
			{
				name: 'Wholesale Chain',
				price: 'Rp 1.8jt / bln',
				highlights: [
					'Unlimited Outlet & Central Warehouse',
					'Fitur Auto-Order Reorder Point',
					'Integrasi Sistem Payment Gateway',
					'Priority Phone Support Technical'
				]
			},
			{
				name: 'Global Supply Enterprise',
				price: 'Custom Quote',
				highlights: [
					'Sistem Custom Supply Chain ERP',
					'Custom Database Replication Layout',
					'Dedicated Server On-Site Setup',
					'Dedicated Support Team 24/7'
				]
			}
		],
		sortOrder: 3
	}
];

const featuresData = [
	{
		title: 'Rekap Keuangan Selesai Otomatis',
		description:
			'Tutup buku tanpa lembur jam 11 malam. Laba/rugi, stok & beban staf keluar sendiri tiap hari.',
		iconName: 'ChartNoAxesCombined',
		sortOrder: 0
	},
	{
		title: 'Payroll & Resep Jalan Sendiri',
		description:
			'Gaji + PPh 21, resep obat & order supplier diproses otomatis — tanpa salah hitung.',
		iconName: 'Settings',
		sortOrder: 1
	},
	{
		title: 'Data Pasien Terkunci Aman',
		description:
			'Enkripsi berlapis, hak akses per peran, audit trail lengkap — siap audit Kemenkes.',
		iconName: 'Shield',
		sortOrder: 2
	},
	{
		title: 'Lolos Bridging Resmi Sekali Jadi',
		description: 'SatuSehat, VClaim BPJS & QRIS terhubung langsung — klaim tidak ditolak lagi.',
		iconName: 'Plug',
		sortOrder: 3
	}
];

const testimonialsData = [
	{
		quote:
			'Tim AORTA membangun LMS kaigopedia sesuai harapan dan kebutuhan kami,responsif dan tepat waktu. Suka sama hasilnya',
		clientName: 'Tim Kaigopedia',
		clientRole: 'kaigopedia.com',
		avatarLetter: 'K',
		avatarColor: '#10b981',
		projectName: 'Platform eLearning / LMS untuk Daycare di Jepang',
		sortOrder: 0
	}
];

const faqsData = [
	{
		question: 'Apakah sistem AORTA bisa di-custom?',
		answer:
			'Bisa. Semua produk AORTA — SIMRS, SIM Klinik, HRIS, dan POS — bisa dikustomisasi sesuai kebutuhan operasional Anda. Mulai dari alur kerja, tampilan, laporan, hingga integrasi dengan sistem pihak ketiga. Tim kami akan mendengar kebutuhan Anda lalu merancang solusi yang tepat, bukan memaksakan template yang kaku.',
		sortOrder: 0
	},
	{
		question: 'Apakah AORTA menerima jasa pembuatan aplikasi selain produk yang sudah ada?',
		answer:
			'Ya. Selain produk standar, kami juga menerima jasa pembuatan aplikasi custom — ERP, sistem inventori, portal e-learning, aplikasi pelayanan publik, dan lainnya. Ceritakan kebutuhan Anda, kami bantu rancang dan bangun dari nol hingga launching.',
		sortOrder: 1
	},
	{
		question: 'Berapa lama proses implementasi sistem?',
		answer:
			'Tergantung kompleksitas. SIM Klinik biasanya selesai dalam 14–21 hari, termasuk setup, migrasi data, dan training staf. SIMRS untuk rumah sakit butuh 2–6 bulan tergantung modul yang diaktifkan. Untuk aplikasi custom, durasi disepakati setelah analisis kebutuhan.',
		sortOrder: 2
	},
	{
		question: 'Apakah sudah terintegrasi BPJS dan SatuSehat?',
		answer:
			'Ya. Bridging BPJS (VClaim) dan integrasi SatuSehat sudah termasuk dalam paket — bukan biaya tambahan. Sistem kami mengikuti regulasi Kemenkes terbaru dan di-update otomatis jika ada perubahan aturan.',
		sortOrder: 3
	},
	{
		question: 'Bagaimana support setelah sistem berjalan?',
		answer:
			'Kami memberikan SLA tertulis dengan jaminan waktu respons. Support tersedia 24/7 via WhatsApp, telepon, dan tiket. Setiap masalah akan ditangani oleh dedicated engineer yang memahami sistem Anda. Update fitur dan patch keamanan juga berjalan otomatis tanpa biaya tambahan.',
		sortOrder: 4
	}
];

const blogPostsData = [
	{
		slug: 'digitalisasi-rumah-sakit-simrs-aorta',
		title: 'Digitalisasi Rumah Sakit: Mengapa SIMRS AORTA Solusi Tepat',
		category: 'Healthcare',
		image: '/assets/hospital2.png',
		author: 'AORTA Team',
		date: '22 Sep 2026',
		readTime: '5 min read',
		excerpt:
			'Migrasi dari sistem manual ke SIMRS berbasis cloud bukan lagi pilihan, melainkan kebutuhan mendesak bagi rumah sakit modern.',
		content:
			'<p>Rumah sakit yang masih mengandalkan kertas dan spreadsheet menghadapi risiko data hilang, antrean panjang, dan ketidaksesuaian billing. SIMRS AORTA dirancang untuk mengatasi semua itu dalam satu platform terpadu.</p><h3>Manfaat Utama</h3><ul><li>Rekam Medis Elektronik (EMR) real-time yang siap terhubung dengan SatuSehat Kemenkes</li><li>Billing system otomatis dengan integrasi VClaim BPJS</li><li>Dashboard operasional untuk manajemen IGD, rawat inap, hingga farmasi</li></ul><p>Dengan implementasi yang bisa selesai dalam 2-6 bulan, rumah sakit Anda bisa segera merasakan efisiensi operasional yang signifikan.</p>',
		metaDescription:
			'Pelajari bagaimana SIMRS AORTA membantu digitalisasi rumah sakit dengan EMR, billing otomatis, dan integrasi BPJS.',
		tags: 'simrs, digitalisasi, rumah sakit, emr, bpjs',
		active: true
	},
	{
		slug: 'hris-modern-kelola-karyawan-lebih-mudah',
		title: 'HRIS Modern: Kelola Karyawan Lebih Mudah dengan AORTA',
		category: 'Business',
		image: '/assets/hris.png',
		author: 'AORTA Team',
		date: '18 Sep 2026',
		readTime: '4 min read',
		excerpt:
			'Manajemen SDMManual sering kali memakan waktu dan rentan kesalahan. HRIS AORTA mengotomatiskan presensi, payroll, hingga PPh 21.',
		content:
			'<p>Tim HR yang masih menghitung gaji dan potongan secara manual pasti paham betapa melelahkannya proses itu setiap bulan. HRIS AORTA mengubah semua itu menjadi beberapa klik saja.</p><h3>Fitur Unggulan</h3><ul><li>Absensi biometrik dan GPS anti-fake</li><li>Kalkulator payroll otomatis dengan PPh 21 & BPJS</li><li>Portal mandiri karyawan (ESS) untuk pengajuan cuti dan slip gaji</li></ul>',
		metaDescription:
			'Temukan bagaimana HRIS AORTA mengotomatiskan presensi, payroll, dan manajemen SDM perusahaan Anda.',
		tags: 'hris, payroll, manajemen sdm, karyawan',
		active: true
	},
	{
		slug: 'pos-stok-bisnis-retail-efisien',
		title: 'POS & Stok: Cara Tingkatkan Efisiensi Bisnis Retail',
		category: 'Retail',
		image: '/assets/pos.png',
		author: 'AORTA Team',
		date: '15 Sep 2026',
		readTime: '4 min read',
		excerpt:
			'Kebocoran kasir dan selisih stok bisa dihilangkan dengan sistem POS yang tepat. Pelajari cara AORTA membantu bisnis retail Anda.',
		content:
			'<p>Bisnis retail sering kali kehilangan profit karena kebocoran kasir dan ketidakakuratan stok. POS & Inventory AORTA dirancang untuk mencegah masalah ini sejak awal.</p><h3>Yang Bisa Anda Dapatkan</h3><ul><li>Kasir omnichannel dengan support QRIS</li><li>Manajemen stok multi-gudang real-time</li><li>Deteksi otomatis expired date dan slow-moving items</li></ul>',
		metaDescription:
			'Pelajari cara meningkatkan efisiensi bisnis retail dengan POS dan manajemen inventori dari AORTA.',
		tags: 'pos, retail, stok, inventori, qris',
		active: true
	}
];

const settingsData = [
	{ key: 'whatsapp_number', value: '6289629949441' },
	{
		key: 'whatsapp_message',
		value: 'Halo Saya Tertarik menggunakan sistem dari AORTA bisa tolong dibantu?'
	},
	{ key: 'email', value: 'aortadigitalsolusi.business@gmail.com' },
	{ key: 'phone', value: '+62 896-2994-9441' },
	{ key: 'address', value: 'Cianjur, Jawa Barat, Indonesia' },
	{ key: 'cta_title', value: 'Digitalisasi Tanpa Pusing Dimulai di Sini.' },
	{
		key: 'cta_description',
		value:
			'Siap bawa operasional institusi dan bisnis Anda jadi lebih rapi serta terukur? Mulai eksplorasi platform modular kami sekarang atau diskusikan kebutuhan blueprint sistem unik Anda bersama tim sales ahli kami.'
	},
	{
		key: 'footer_description',
		value:
			'Penyedia infrastruktur teknologi modular kelas enterprise. Berfokus pada keandalan sistem kesehatan pintar, efisiensi manajemen SDM medis, dan kustomisasi arsitektur software siap pakai.'
	}
];

async function seed() {
	console.log('Seeding database...');

	// Clear existing data
	await db.delete(blogPosts);
	await db.delete(settings);
	await db.delete(faqs);
	await db.delete(testimonials);
	await db.delete(features);
	await db.delete(products);
	await db.delete(hero);
	await db.delete(sessions);
	await db.delete(users);

	// Create superadmin user
	const passwordHash = await hashPassword('superadmin');
	await db.insert(users).values({
		email: 'aorta@email.com',
		passwordHash
	});

	// Insert data
	await db.insert(hero).values({ id: 1, ...heroData });
	await db.insert(products).values(productsData);
	await db.insert(features).values(featuresData);
	await db.insert(testimonials).values(testimonialsData);
	await db.insert(faqs).values(faqsData);
	await db.insert(blogPosts).values(blogPostsData);
	await db.insert(settings).values(settingsData);

	console.log('Seed complete!');
	await client.end();
}

seed().catch((err) => {
	console.error('Seed failed:', err);
	process.exit(1);
});
