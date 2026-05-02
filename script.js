const book = document.querySelector("#book");

const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");
const paper4 = document.querySelector("#p4");

// Array menyimpan semua lembar halaman
const papers = [paper1, paper2, paper3, paper4];

let currentLocation = 1;
const numOfPapers = papers.length;
const maxLocation = numOfPapers + 1;

// Fungsi untuk menggeser buku ke tengah saat terbuka
function openBook() {
    book.style.transform = "translateX(50%)";
}

// Fungsi untuk menggeser buku kembali ke posisi semula saat ditutup
function closeBook(isAtBeginning) {
    if(isAtBeginning) {
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = "translateX(100%)";
    }
}

// Membuka halaman selanjutnya
function goNextPage() {
    if(currentLocation < maxLocation) {
        if (currentLocation === 1) {
            openBook();
        }
        
        const currentPaper = papers[currentLocation - 1];
        currentPaper.classList.add("flipped");
        
        // Timeout digunakan agar z-index berubah setelah halaman setengah terbalik
        // sehingga tidak terjadi clipping/halaman bertumpuk salah
        setTimeout(() => {
            currentPaper.style.zIndex = currentLocation;
        }, 400);
        
        currentLocation++;
        
        // Jika sudah mencapai halaman terakhir, geser buku
        if (currentLocation === maxLocation) {
            setTimeout(() => {
                closeBook(false);
            }, 400);
        }
    }
}

// Kembali ke halaman sebelumnya
function goPrevPage() {
    if(currentLocation > 1) {
        if (currentLocation === maxLocation) {
            openBook();
        }
        
        currentLocation--;
        const currentPaper = papers[currentLocation - 1];
        
        setTimeout(() => {
            currentPaper.style.zIndex = papers.length - currentLocation + 1;
        }, 400);
        
        currentPaper.classList.remove("flipped");
        
        if (currentLocation === 1) {
            setTimeout(() => {
                closeBook(true);
            }, 400);
        }
    }
}

// Tambahkan event listener click/touch pada setiap sisi halaman
papers.forEach((paper, index) => {
    const front = paper.querySelector('.front');
    const back = paper.querySelector('.back');

    // Jika bagian depan ditekan, buka halaman selanjutnya
    front.addEventListener('click', () => {
        if (currentLocation === index + 1) {
            goNextPage();
        }
    });

    // Jika bagian belakang ditekan, kembali ke halaman sebelumnya
    back.addEventListener('click', () => {
        if (currentLocation === index + 2) {
            goPrevPage();
        }
    });
});
