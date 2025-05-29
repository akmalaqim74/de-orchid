// faq.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  animations: [
    trigger('slideDown', [
      state('closed', style({
        height: '0px',
        opacity: 0,
        overflow: 'hidden'
      })),
      state('open', style({
        height: '*',
        opacity: 1,
        overflow: 'visible'
      })),
      transition('closed <=> open', [
        animate('400ms cubic-bezier(0.4, 0, 0.2, 1)')
      ])
    ]),
    trigger('rotateIcon', [
      state('closed', style({
        transform: 'rotate(0deg)'
      })),
      state('open', style({
        transform: 'rotate(45deg)'
      })),
      transition('closed <=> open', [
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)')
      ])
    ]),
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms cubic-bezier(0.4, 0, 0.2, 1)', 
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('staggerItems', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('500ms cubic-bezier(0.4, 0, 0.2, 1)', 
              style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class FaqComponent implements OnInit, OnDestroy {
  searchQuery: string = '';
  selectedCategory: string = 'semua';
  expandedItems: Set<number> = new Set();
  filteredFAQs: any[] = [];
  
  categories = [
    { id: 'semua', name: 'Semua', icon: '📋' },
    { id: 'harga', name: 'Harga', icon: '💰' },
    { id: 'perkhidmatan', name: 'Perkhidmatan', icon: '🎊' },
    { id: 'tempahan', name: 'Tempahan', icon: '📅' },
    { id: 'dewan', name: 'Dewan', icon: '🏛️' },
    { id: 'katering', name: 'Katering', icon: '🍽️' }
  ];

  FAQ: any[] = [
    {
      id: 1,
      category: 'harga',
      question: 'Berapakah harga pakej perkahwinan yang ditawarkan?',
      answer: `Pakej perkahwinan kami bermula dari RM 8,888 hingga RM 25,888 bergantung kepada keperluan anda. Setiap pakej termasuk:
      
      • Hiasan dan persediaan venue
      • Perkhidmatan katering premium Faradana
      • Koordinasi acara profesional
      • Peralatan audio-visual
      • Pilihan fotografi dan videografi
      
      Kami menyediakan pakej yang boleh disesuaikan mengikut bajet dan visi anda. Hubungi kami untuk sebut harga terperinci.`,
      popular: true,
      tags: ['harga', 'pakej', 'kos']
    },
    {
      id: 2,
      category: 'tempahan',
      question: 'Berapa awal saya perlu menempah majlis perkahwinan?',
      answer: `Kami mengesyorkan tempahan dibuat 6-12 bulan lebih awal, terutamanya untuk musim puncak (Disember-Februari dan Jun-Ogos).
      
      **Garis masa tempahan yang disyorkan:**
      • **12+ bulan:** Pilihan tarikh terbaik dan pilihan penyesuaian penuh
      • **6-12 bulan:** Ketersediaan yang baik dengan beberapa penyesuaian
      • **3-6 bulan:** Tarikh terhad tetapi masih mungkin
      • **Kurang 3 bulan:** Tertakluk kepada ketersediaan
      
      Walau bagaimanapun, kami faham kadangkala rancangan berubah dengan pantas, dan kami akan berusaha sedaya upaya untuk menampung tempahan notis pendek.`,
      popular: true,
      tags: ['tempahan', 'tarikh', 'awal']
    },
    {
      id: 3,
      category: 'perkhidmatan',
      question: 'Apakah perkhidmatan yang disertakan dalam pakej perkahwinan?',
      answer: `Pakej perkahwinan komprehensif kami termasuk semua yang anda perlukan:
      
      **Perkhidmatan Teras:**
      • Hiasan venue lengkap dan susun atur bunga
      • Katering premium Faradana dengan pelbagai pilihan menu
      • Koordinasi dan perancangan perkahwinan profesional
      • Sistem bunyi dan lampu
      • Meja, kerusi, dan linen
      • Persediaan bilik pengantin
      
      **Perkhidmatan Tambahan:**
      • Fotografi dan videografi
      • Perkhidmatan band langsung atau DJ
      • Kek perkahwinan dan meja pencuci mulut
      • Pengaturan pengangkutan
      • Bantuan tempahan penginapan`,
      tags: ['perkhidmatan', 'pakej', 'termasuk']
    },
    {
      id: 4,
      category: 'katering',
      question: 'Bolehkah anda menampung keperluan diet khas dan permintaan istimewa?',
      answer: `Sudah tentu! Pasukan katering Faradana kami pakar dalam menampung pelbagai keperluan dan pilihan diet:
      
      **Kami boleh menampung:**
      • Keperluan halal (dapur halal yang disahkan)
      • Pilihan vegetarian dan vegan
      • Hidangan bebas gluten
      • Alahan dan sekatan diet tertentu
      • Pilihan masakan budaya dan tradisional
      
      Sila maklumkan sebarang keperluan diet semasa perundingan awal supaya kami boleh merancang dengan sewajarnya. Chef kami berpengalaman dalam mencipta alternatif lazat yang memenuhi keperluan anda.`,
      popular: true,
      tags: ['katering', 'diet', 'halal', 'vegetarian']
    },
    {
      id: 5,
      category: 'dewan',
      question: 'Berapakah kapasiti maksimum dewan perkahwinan anda?',
      answer: `Dewan perkahwinan elegan kami boleh menampung saiz kumpulan yang berbeza bergantung kepada susunan tempat duduk:
      
      • **Gaya jamuan:** Sehingga 400 tetamu
      • **Gaya koktel:** Sehingga 500 tetamu
      • **Gaya teater:** Sehingga 600 tetamu
      • **Susunan campuran:** Boleh disesuaikan mengikut pilihan anda
      
      Dewan ini mempunyai siling tinggi, candelier elegan, dan boleh dikonfigurasikan untuk sepadan dengan tema perkahwinan anda. Kami juga mempunyai kawasan taman luar yang cantik untuk resepsi koktel atau sesi foto.`,
      tags: ['dewan', 'kapasiti', 'tetamu', 'venue']
    },
    {
      id: 6,
      category: 'tempahan',
      question: 'Apakah polisi pembatalan dan bayaran balik anda?',
      answer: `Kami faham bahawa keadaan boleh berubah. Polisi pembatalan kami direka untuk adil sambil melindungi operasi perniagaan kami:
      
      **Garis Masa Pembatalan:**
      • **12+ bulan sebelum:** Bayaran balik 90%
      • **6-12 bulan sebelum:** Bayaran balik 70%
      • **3-6 bulan sebelum:** Bayaran balik 50%
      • **1-3 bulan sebelum:** Bayaran balik 25%
      • **Kurang 1 bulan:** Tiada bayaran balik (tertakluk perbincangan)
      
      Kami juga menawarkan pilihan tukar tarikh dengan bayaran minimum jika anda perlu menjadual semula.`,
      tags: ['pembatalan', 'bayaran balik', 'polisi']
    },
    {
      id: 7,
      category: 'perkhidmatan',
      question: 'Adakah anda menyediakan perkhidmatan perancangan dan koordinasi perkahwinan?',
      answer: `Ya! Kami menawarkan perkhidmatan perancangan dan koordinasi perkahwinan komprehensif:
      
      **Perkhidmatan Perancangan:**
      • Perundingan awal dan pembangunan visi
      • Koordinasi dan pengurusan vendor
      • Pembangunan garis masa dan penjadualan
      • Perancangan dan pengesanan bajet
      • Perancangan susun atur dan hiasan venue
      
      **Koordinasi Hari Perkahwinan:**
      • Pengawasan dan pengurusan persediaan
      • Koordinasi vendor pada hari perkahwinan
      • Pengurusan dan pelaksanaan garis masa
      • Penyelesaian masalah dan pengendalian kecemasan
      • Koordinasi pembersihan`,
      popular: true,
      tags: ['perancangan', 'koordinasi', 'wedding planner']
    },
    {
      id: 8,
      category: 'harga',
      question: 'Adakah terdapat caj tambahan yang perlu saya ketahui?',
      answer: `Kami percaya pada harga yang telus. Berikut adalah caj tambahan berpotensi yang mungkin dikenakan:
      
      **Tambahan Pilihan:**
      • Susun atur bunga premium (tambahan RM 800-2,000)
      • Jam acara dilanjutkan (RM 300/jam selepas 11 malam)
      • Tetamu tambahan melebihi had pakej (RM 80-120/orang)
      • Naik taraf menu premium (berbeza mengikut pilihan)
      • Peralatan pencahayaan atau AV khas (RM 500-1,500)
      
      **Caj Perkhidmatan:**
      • Caj perkhidmatan: 10% (termasuk dalam harga sebut harga)
      • Cukai kerajaan: 6% SST (jika berkenaan)`,
      tags: ['harga', 'caj tambahan', 'kos', 'telus']
    },
    {
      id: 9,
      category: 'dewan',
      question: 'Adakah anda mempunyai kemudahan parking?',
      answer: `Ya, kami menyediakan kemudahan parking yang mencukupi untuk keselesaan tetamu anda:
      
      • **Ruang parking percuma:** 150 tempat parking berbumbung
      • **Parking VIP:** 20 tempat terpelihara berhampiran pintu masuk
      • **Parking boleh diakses:** 10 ruang yang ditetapkan untuk tetamu OKU
      • **Perkhidmatan valet:** Tersedia atas permintaan (caj tambahan)
      
      Kawasan parking kami berlampu dan dijamin dengan pengawasan CCTV untuk keselamatan dan ketenangan fikiran tetamu anda.`,
      tags: ['parking', 'kemudahan', 'keselamatan']
    },
    {
      id: 10,
      category: 'tempahan',
      question: 'Apakah jadual pembayaran yang anda perlukan?',
      answer: `Jadual pembayaran kami direka untuk mudah diurus dan sesuai:
      
      **Jadual Pembayaran:**
      • **Pengesahan tempahan:** Deposit 30% untuk menjimatkan tarikh anda
      • **3 bulan sebelum:** 40% daripada jumlah kos pakej
      • **1 bulan sebelum:** Baki 30% yang tinggal
      
      **Kaedah Pembayaran yang Diterima:**
      • Pindahan bank (diutamakan)
      • Kad kredit (Visa, MasterCard)
      • Bayaran tunai
      • Pelan ansuran tersedia (tertakluk kelulusan)`,
      tags: ['pembayaran', 'jadual', 'deposit', 'ansuran']
    },
    {
      id: 11,
      category: 'perkhidmatan',
      question: 'Bolehkah kami membuat lawatan tapak sebelum menempah?',
      answer: `Sudah tentu! Kami amat mengesyorkan menjadualkan lawatan tapak untuk melihat venue dan kemudahan cantik kami secara langsung:
      
      **Apa yang disertakan dalam lawatan tapak:**
      • Lawatan berpandu dewan perkahwinan dan kemudahan
      • Perundingan dengan koordinator perkahwinan kami
      • Rasa menu contoh (melalui temujanji)
      • Perbincangan keperluan khusus anda
      • Peluang foto di kawasan berbeza
      
      **Untuk menjadualkan lawatan:**
      • Hubungi kami sekurang-kurangnya 3 hari lebih awal
      • Lawatan hujung minggu tersedia melalui temujanji
      • Bawa pasangan dan ahli keluarga utama
      • Rancang untuk 1-2 jam untuk lawatan lengkap`,
      tags: ['lawatan', 'tapak', 'venue', 'konsultasi']
    },
    {
      id: 12,
      category: 'katering',
      question: 'Apakah pilihan masakan yang ditawarkan oleh Faradana Catering?',
      answer: `Faradana Catering menawarkan pelbagai pilihan masakan untuk memenuhi semua citarasa:
      
      **Masakan Tempatan Malaysia:**
      • Hidangan tradisional Melayu (Nasi Minyak, Rendang, Gulai)
      • Hidangan gabungan Malaysia-Cina

      
      Semua hidangan disediakan dengan bahan-bahan segar dan berkualiti tinggi oleh chef berpengalaman kami.`,
      popular: true,
      tags: ['katering', 'masakan', 'menu', 'faradana']
    }
  ];

  constructor() {}

  ngOnInit(): void {
    this.filteredFAQs = [...this.FAQ];
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  onSearchChange(): void {
    this.filterFAQs();
  }

  selectCategory(categoryId: string): void {
    this.selectedCategory = categoryId;
    this.filterFAQs();
  }

  private filterFAQs(): void {
    let filtered = [...this.FAQ];

    // Filter by category
    if (this.selectedCategory !== 'semua') {
      filtered = filtered.filter(faq => faq.category === this.selectedCategory);
    }

    // Filter by search query
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(faq => 
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.tags.some((tag: string) => tag.toLowerCase().includes(query))
      );
    }

    this.filteredFAQs = filtered;
  }

  toggleFAQ(id: number): void {
    if (this.expandedItems.has(id)) {
      this.expandedItems.delete(id);
    } else {
      this.expandedItems.add(id);
    }
  }

  isFAQExpanded(id: number): boolean {
    return this.expandedItems.has(id);
  }

  expandAll(): void {
    this.filteredFAQs.forEach(faq => this.expandedItems.add(faq.id));
  }

  collapseAll(): void {
    this.expandedItems.clear();
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.filterFAQs();
  }

  getVisibleCount(): number {
    return this.filteredFAQs.length;
  }

  getTotalCount(): number {
    return this.FAQ.length;
  }

  highlightSearchTerm(text: string): string {
    if (!this.searchQuery.trim()) return text;
    
    const regex = new RegExp(`(${this.searchQuery})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 text-yellow-800 px-1 rounded">$1</mark>');
  }

  openWhatsApp(): void {
    const phone = '60123456789'; // Replace with actual phone number
    const message = 'Assalamualaikum, saya berminat untuk mengetahui lebih lanjut tentang pakej perkahwinan De\'Orchid.';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  }

  getCategoryName(categoryId: string): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  }

  formatAnswer(answer: string): string {
    // Convert markdown-like formatting to HTML
    let formatted = answer
      // Convert **bold** to <strong>
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Convert bullet points
      .replace(/^• /gm, '<li>')
      // Convert line breaks
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');

    // Wrap in paragraph tags
    if (!formatted.startsWith('<')) {
      formatted = '<p>' + formatted + '</p>';
    }

    // Handle bullet points properly
    formatted = formatted.replace(/<li>/g, '</p><ul><li>').replace(/<\/li>/g, '</li></ul><p>');
    
    // Clean up empty paragraphs and fix HTML structure
    formatted = formatted
      .replace(/<p><\/p>/g, '')
      .replace(/<p><ul>/g, '<ul>')
      .replace(/<\/ul><p>/g, '</ul>')
      .replace(/(<ul><li>.*?<\/li><\/ul>)/gs, (match) => {
        return match.replace(/<\/li><\/ul><ul><li>/g, '</li><li>');
      });

    return formatted;
  }

  trackByFAQ(index: number, faq: any): number {
    return faq.id;
  }

  trackByCategory(index: number, category: any): string {
    return category.id;
  }
}