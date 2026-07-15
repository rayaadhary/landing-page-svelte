const articles = [
	{
		slug: 'cara-memilih-simrs-rumah-sakit',
		title: 'Cara Memilih SIMRS yang Tepat untuk Rumah Sakit Anda',
		category: 'SIMRS',
		image: '/assets/hospital2.png',
		author: 'Tim AORTA',
		date: '2025-07-10',
		readTime: '5 menit',
		excerpt: 'Panduan lengkap memilih Sistem Informasi Manajemen Rumah Sakit (SIMRS) yang sesuai dengan kelas dan kebutuhan operasional RS Anda.',
	},
	{
		slug: 'apa-itu-sim-klinik-manfaat',
		title: 'Apa itu SIM Klinik? Manfaat dan Fitur Utama untuk Klinik Modern',
		category: 'SIM Klinik',
		image: '/assets/clinic2.png',
		author: 'Tim AORTA',
		date: '2025-07-05',
		readTime: '4 menit',
		excerpt: 'Mengenal Sistem Informasi Manajemen Klinik (SIM Klinik), manfaatnya untuk operasional sehari-hari, dan fitur apa saja yang wajib ada.',
	},
	{
		slug: 'biaya-jasa-pembuatan-aplikasi-custom',
		title: 'Berapa Biaya Jasa Pembuatan Aplikasi Custom di Indonesia?',
		category: 'Custom Software',
		image: '/assets/pos.png',
		author: 'Tim AORTA',
		date: '2025-06-28',
		readTime: '6 menit',
		excerpt: 'Rincian perkiraan biaya jasa pembuatan aplikasi custom di Indonesia — dari aplikasi sederhana hingga sistem enterprise kompleks.',
	},
	{
		slug: 'perbedaan-simrs-dan-aplikasi-klinik',
		title: 'Perbedaan SIMRS vs Aplikasi Klinik: Mana yang Sesuai untuk Institusi Anda?',
		category: 'Perbandingan',
		image: '/assets/hospital.png',
		author: 'Tim AORTA',
		date: '2025-06-20',
		readTime: '4 menit',
		excerpt: 'Bingung memilih antara SIMRS untuk rumah sakit atau aplikasi klinik? Simak perbedaan mendasar dan panduan memilih dari AORTA.',
	},
];

export function getAllArticles() {
	return articles.map(({ slug, title, category, image, author, date, readTime, excerpt }) => ({
		slug, title, category, image, author, date, readTime, excerpt
	}));
}
