export const products = [
	{
		slug: 'simrs',
		title: 'SIMRS',
		category: 'Healthcare',
		overview:
			'Sistem Informasi Manajemen Rumah Sakit untuk operasional terpadu: pendaftaran, EMR, farmasi, billing, klaim BPJS, hingga pelaporan regulasi.',
		screenshots: ['/assets/sim-klinik-catalog.png'],
		modules: ['Pendaftaran & EMR', 'Farmasi & Gudang', 'Billing & Klaim BPJS', 'Laboratorium & Radiologi', 'Pelaporan regulasi', 'Manajemen SDM'],
		pricing: [
			{ name: 'Core', price: 'Hubungi kami', highlights: ['Pendaftaran & EMR', 'Pelaporan dasar', 'Role & permission'] },
			{ name: 'Standard', price: 'Hubungi kami', highlights: ['Semua Core', 'Farmasi & Gudang', 'Billing & Klaim BPJS'] },
			{ name: 'Enterprise', price: 'Hubungi kami', highlights: ['Semua Standard', 'Integrasi eksternal', 'Support prioritas'] }
		]
	},
	{
		slug: 'sim-klinik',
		title: 'SIM Klinik',
		category: 'Healthcare',
		overview:
			'Kelola pendaftaran, kasir, rekam medis, pemeriksaan lab, hingga laporan dalam satu platform terintegrasi.',
		screenshots: ['/assets/sim-klinik-catalog.png'],
		modules: ['Pendaftaran Pasien', 'Rekam Medis Elektronik', 'Pemeriksaan Lab', 'Pelayanan Medis', 'Antrean','Farmasi','Kasir', 'Laporan','Integrasi BPJS dan Satu Sehat'],
		pricing: [
			{ name: 'Starter', price: 'Mulai dari', highlights: ['Pendaftaran', 'Rekam medis', 'Laporan dasar'] },
			{ name: 'Growth', price: 'Hubungi kami', highlights: ['Semua Starter', 'Kasir & inventory', 'Janji temu & notifikasi'] },
			{ name: 'Network', price: 'Hubungi kami', highlights: ['Semua Growth', 'Multi-cabang', 'Pelatihan tim'] }
		]
	},
	{
		slug: 'pos',
		title: 'POS / Aplikasi Pencatatan Toko',
		category: 'Retail',
		overview:
			'Point of Sale modern untuk toko, restoran, dan gerai: kasir cepat, stok & varian, diskon & membership, pelaporan penjualan.',
		screenshots: ['/assets/pos-catalog.png'],
		modules: ['Kasir cepat', 'Stok & varian', 'Diskon & membership', 'Laporan penjualan', 'Integrasi printer & scanner'],
		pricing: [
			{ name: 'Lite', price: 'Mulai dari', highlights: ['Kasir', 'Laporan dasar', 'Stok sederhana'] },
			{ name: 'Pro', price: 'Hubungi kami', highlights: ['Semua Lite', 'Membership & promo', 'Varian & bundle'] },
			{ name: 'Multi-Outlet', price: 'Hubungi kami', highlights: ['Semua Pro', 'Manajemen beberapa outlet', 'Support prioritas'] }
		]
	},
	{
		slug: 'custom',
		title: 'Create Your Own System',
		category: 'Custom',
		overview:
			'Bangun sistem sesuai kebutuhan bisnis Anda dengan modul siap pakai, integrasi API, dan deploy cepat. Skalabel dan aman untuk jangka panjang.',
		screenshots: [],
		modules: ['Modular & scalable', 'Integrasi API', 'Role & permission', 'Audit & logging', 'Dashboard kustom'],
		pricing: [
			{ name: 'Discovery', price: 'Hubungi kami', highlights: ['Workshop kebutuhan', 'Rencana arsitektur', 'Estimasi implementasi'] },
			{ name: 'Build', price: 'Hubungi kami', highlights: ['Pengembangan modul', 'Integrasi & testing', 'Deploy'] },
			{ name: 'Scale', price: 'Hubungi kami', highlights: ['Monitoring', 'Optimasi performa', 'Support SLA'] }
		]
	}
];

export function getProductBySlug(slug) {
	return products.find((p) => p.slug === slug);
}
