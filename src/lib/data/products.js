const products = [
	{
		slug: 'simrs',
		title: 'SIMRS Core Enterprise',
		category: 'HEALTHCARE SYSTEM',
		overview: 'Solusi transformasi digital menyeluruh untuk manajemen Rumah Sakit skala besar. Menyinkronkan seluruh alur kerja klinis, operasional, hingga administrasi keuangan dalam satu pusat data terpadu.',
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
			{ name: 'Pratama Tier', price: 'Rp 4.9jt / bln', highlights: ['Akses 30 User Eksternal', 'Bridging BPJS & SatuSehat', 'Standard Cloud Database', 'Jam Kerja Support (08.00 - 17.00)'] },
			{ name: 'Enterprise Tier', price: 'Rp 14.5jt / bln', highlights: ['Unlimited User & Staff', 'Full Modul RIS/PACS & IGD', 'Dedicated Server VPS High-Spec', '24/7 Priority Engineer Support'] },
			{ name: 'Custom Hospital Node', price: 'Custom Quote', highlights: ['On-Premise Infrastructure Deployment', 'Custom Modul sesuai Perda / Grand Design', 'Source Code Ownership Option', 'In-House IT Team Training Service'] }
		]
	},
	{
		slug: 'sim-klinik',
		title: 'SIM Klinik Pratama & Utama',
		category: 'HEALTHCARE SYSTEM',
		overview: 'Sistem manajemen klinik modern multi-cabang yang dirancang end-to-end untuk memotong birokrasi pendaftaran yang lambat dan mengontrol rekam medis pasien.',
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
			{ name: 'Starter Node', price: 'Rp 850rb / bln', highlights: ['Maksimal 2 Cabang Klinik', 'RME Standar Kemenkes RI', 'Modul Kasir & Stok Dasar', 'Email Support Level 1'] },
			{ name: 'Multi-Branch Pro', price: 'Rp 2.2jt / bln', highlights: ['Unlimited Cabang & Multi-Gudang', 'Notifikasi Integrasi WhatsApp Gateway', 'Sinkronisasi Dashboard Keuangan', 'Premium Cloud Backup 2x Sehari'] },
			{ name: 'Corporate Grid', price: 'Custom Quote', highlights: ['White-Label Application Branding', 'SLA Uptime Guarantee 99.99%', 'Dedicated Database Cluster', 'Dedicated Account Manager Dedicated'] }
		]
	},
	{
		slug: 'hris',
		title: 'HRIS Smart Corporate',
		category: 'BUSINESS ENTERPRISE',
		overview: 'Sistem manajemen SDM cerdas berbasis cloud untuk mengotomatisasi seluruh administrasi personalia, kehadiran biometrik, hingga kalkulasi payroll perusahaan Anda.',
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
			{ name: 'Basic Team', price: 'Rp 1.2jt / bln', highlights: ['Maksimal 50 Karyawan Aktif', 'Fitur Presensi GPS & ESS App', 'Kalkulasi Gaji Standar', 'SLA Response 12 Jam'] },
			{ name: 'Growth Scale', price: 'Rp 3.5jt / bln', highlights: ['Hingga 500 Karyawan Aktif', 'Kalkulator Pajak PPh 21 & BPJS Tk/Kes', 'Multi-Shift Scheduling Logika Rumit', 'Dedicated Chat Support Channel'] },
			{ name: 'Conglomerate Node', price: 'Custom Quote', highlights: ['Unlimited Employee & Subsidiaries', 'Custom API Core HR Integration', 'On-Premise Server Hybrid Support', 'Annual Compliance Audit Assistance'] }
		]
	},
	{
		slug: 'pos-inventory',
		title: 'POS & Intelligent Inventory',
		category: 'RETAIL & COMMERCE',
		overview: 'Aplikasi kasir pintar serbaguna untuk mengamankan arus pendapatan dan mengoptimalkan manajemen stok multi-gudang pada bisnis retail, grosir, maupun F&B.',
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
			{ name: 'Retail Shop', price: 'Rp 450rb / bln', highlights: ['1 Lokasi Toko / Outlet', 'Aplikasi Kasir Support Offline', 'Laporan Penjualan Standar', 'Community Support Access'] },
			{ name: 'Wholesale Chain', price: 'Rp 1.8jt / bln', highlights: ['Unlimited Outlet & Central Warehouse', 'Fitur Auto-Order Reorder Point', 'Integrasi Sistem Payment Gateway', 'Priority Phone Support Technical'] },
			{ name: 'Global Supply Enterprise', price: 'Custom Quote', highlights: ['Sistem Custom Supply Chain ERP', 'Custom Database Replication Layout', 'Dedicated Server On-Site Setup', 'Dedicated Support Team 24/7'] }
		]
	}
];

export function getProductBySlug(slug) {
	return products.find(p => p.slug === slug);
}
