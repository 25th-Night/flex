document.addEventListener("DOMContentLoaded", function () {
    show_products();
});

let category_list = {
    0: "전체",
    1: "패션",
    2: "전자제품",
    3: "음식",
    4: "화장품",
    5: "기타",
};

const itemsPerPage = 8; // 한 페이지에 보여줄 아이템 개수
let currentPage = 1; // 현재 페이지 번호
let currentProducts = []; // 현재 페이지에 표시될 아이템

// 객체에서 value를 이용해 key 값을 찾아오는 함수
function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
}

// 가격을 숫자로 변환하는 함수
function getPrice(priceString) {
    return parseInt(priceString.replace(/[^\d]/g, ""));
}

// 페이지네이션 리스트를 렌더링하는 함수
function renderPagination(arr) {
    const pagination = document.getElementById("pagination");
    const paginationList = pagination.querySelector(".pagination-list");
    paginationList.innerHTML = "";

    const pageCount = Math.ceil(arr.length / itemsPerPage);

    // 페이지네이션 리스트 아이템을 생성하고 클릭 이벤트를 추가함
    for (let i = 1; i <= pageCount; i++) {
        const paginationItem = document.createElement("li");
        paginationItem.innerHTML = `<a href="#" class="pagination-link">${i}</a>`;

        paginationItem.addEventListener("click", function (event) {
            event.preventDefault();
            currentPage = i;
            renderData(arr);
        });

        paginationList.appendChild(paginationItem);
    }
}

// 데이터를 렌더링하는 함수
function renderData(arr) {
    // const dataContainer = document.getElementById("data-container");
    const productsList = document.querySelector(".product-wrap");
    productsList.innerHTML = "";

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    currentProducts = arr.slice(startIndex, endIndex);

    currentProducts.forEach((item) => {
        // 각 아이템을 렌더링하고 데이터를 출력
        const itemElement = document.createElement("div");
        itemElement.innerHTML = `<div">
                                    <h5 class="product-text" id="${item.id}" style="background-image:url('${item.image_url}')">
                                        ${item.name}
                                    </h5>
                                </div>`; // 예시로 item.name을 출력
        productsList.appendChild(itemElement);
    });
}

// R : 전체 데이터 조회
function show_products(category = null) {
    var url = "";
    if (category) {
        url = `/products?category=${category}`;
    } else {
        url = "/products";
    }

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            let products = data["products"];
            renderPagination(products);
            renderData(products);
        });
}

// 이벤트 등록 : 로고 이미지 클릭 시 홈페이지로 이동
let serviceTitle = document.querySelector(".service-title");
serviceTitle.addEventListener("click", () => {
    window.location.href = "/";
});

// 이벤트 등록 : 페이지 상단 카테고리별 데이터 조회
let category_section = document.querySelector(".right-section");
category_section.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-category")) {
        let category = getKeyByValue(category_list, event.target.textContent);
        show_products(category);
        document.querySelector(".product-detail").style.display = "none";
    } else {
        event.stopPropagation();
    }
});

// C : 데이터 단건 저장
function save_product() {
    let user = document.querySelector("#RegisterModal .user").value;
    let name = document.querySelector("#RegisterModal .name").value;
    let category = document.querySelector("#RegisterModal .category");
    category = category.options[category.selectedIndex].value;
    let price = document.querySelector("#RegisterModal .price").value;
    let url = document.querySelector("#RegisterModal .url").value;
    let description = document.querySelector(
        "#RegisterModal .description"
    ).value;
    let formData = new FormData();
    formData.append("user_give", user);
    formData.append("name_give", name);
    formData.append("category_give", category);
    formData.append("price_give", price);
    formData.append("url_give", url);
    formData.append("description_give", description);

    fetch("/products", { method: "POST", body: formData })
        .then((res) => res.json())
        .then((data) => {
            window.location.reload();
        });
}

// 이벤트 등록 : 상품 상세 정보 보기란에서 Modify 버튼 클릭 시, 모달창에 기존 데이터 삽입
let productRegister = document.querySelector(".btn-register-confirm");
productRegister.addEventListener("click", () => {
    save_product();
});

// R : 단건 데이터 조회
function show_product(id) {
    fetch(`products/${id}`)
        .then((res) => res.json())
        .then((data) => {
            let product = data["product"];
            document.querySelector(
                ".product-detail-img"
            ).style.backgroundImage = `url('${product["image_url"]}')`;
            document.querySelector(".product-detail-content.user").innerText =
                product["user"];
            document.querySelector(".product-detail-content.name").innerText =
                product["name"];
            let category_id = product["category"];
            document.querySelector(
                ".product-detail-content.category"
            ).innerText = category_list[category_id];
            document.querySelector(
                ".product-detail-content.price"
            ).innerText = `${product["price"].toLocaleString()}원`;
            document.querySelector(".product-detail-content.url a").href =
                product["url"];
            document.querySelector(
                ".product-detail-content.description"
            ).innerText = product["description"];
        });
}

// 이벤트 등록 : 상품 상세 정보 보기
let productsList = document.querySelector(".product-wrap");
productsList.addEventListener("click", (event) => {
    if (event.target.classList.contains("product-text")) {
        let productId = event.target.id;
        show_product(productId);
        let productDetail = document.querySelector(".product-detail");
        if (productDetail.classList.length === 1) {
            productDetail.classList.add(productId);
            productDetail.style.display = "block";
            productDetail.scrollIntoView({ behavior: "smooth" });
        } else if (productId != productDetail.classList.item(1)) {
            productDetail.classList.remove(productDetail.classList.item(1));
            productDetail.classList.add(productId);
            productDetail.style.display = "block";
            productDetail.scrollIntoView({ behavior: "smooth" });
        } else {
            productDetail.classList.remove(productDetail.classList.item(1));
            productDetail.style.display = "none";
        }
    } else {
        event.stopPropagation();
    }
});

// 기존에 저장된 데이터를 불러와 input box에 삽입
function control_modify_modal() {
    document
        .querySelector("#ModifyModal")
        .addEventListener("shown.bs.modal", function () {
            let user = document.querySelector(
                ".product-detail-content.user"
            ).innerText;
            let name = document.querySelector(
                ".product-detail-content.name"
            ).innerText;
            let category = getKeyByValue(
                category_list,
                document.querySelector(".product-detail-content.category")
                    .innerText
            );
            let price = getPrice(
                document.querySelector(".product-detail-content.price")
                    .innerText
            );
            let url = document.querySelector(".product-detail-content.url");
            url = url.querySelector("a").href;
            let description = document.querySelector(
                ".product-detail-content.description"
            ).innerText;
            document.querySelector("#ModifyModal .input-modal.user").value =
                user;
            document.querySelector("#ModifyModal .input-modal.name").value =
                name;
            document.querySelector(
                "#ModifyModal .input-modal.category option[value='" +
                    category +
                    "']"
            ).selected = true;
            document.querySelector("#ModifyModal .input-modal.price").value =
                price;
            document.querySelector("#ModifyModal .input-modal.url").value = url;
            document.querySelector(
                "#ModifyModal .input-modal.description"
            ).value = description;
        });
}

// 이벤트 등록 : 상품 상세 정보 보기란에서 Modify 버튼 클릭 시, 모달창에 기존 데이터 삽입
let productModify = document.querySelector(".btn-modify");
productModify.addEventListener("click", () => {
    control_modify_modal();
});

// U : 데이터 수정
function modify_product() {
    const productDetail = document.querySelector(".product-detail");
    const id = productDetail.classList.item(1);

    let user = document.querySelector("#ModifyModal .user").value;
    let name = document.querySelector("#ModifyModal .name").value;
    let category = document.querySelector("#ModifyModal .category");
    category = category.options[category.selectedIndex].value;
    let price = document.querySelector("#ModifyModal .price").value;
    let url = document.querySelector("#ModifyModal .url").value;
    let description = document.querySelector("#ModifyModal .description").value;
    let formData = new FormData();
    formData.append("user_give", user);
    formData.append("name_give", name);
    formData.append("category_give", category);
    formData.append("price_give", price);
    formData.append("url_give", url);
    formData.append("description_give", description);

    fetch(`products/${id}`, { method: "PUT", body: formData })
        .then((res) => res.json())
        .then((data) => {
            let modal = document.querySelector("#ModifyModal");
            let modalBackdrop = document.querySelector(".modal-backdrop");
            modalBackdrop.parentNode.removeChild(modalBackdrop);
            modal.removeAttribute("aria-modal");
            modal.removeAttribute("aria-hidden");
            document.body.classList.remove("modal-open");
            modal.style.display = "none";
            modal.classList.remove("show");
            show_product(id);
            document.querySelector(".product-detail").style.display = "block";
        });
}

// 이벤트 등록 : 수정 모달창에서 Save changes 클릭 시 데이터 수정
let modifyConfirm = document.querySelector(".btn-modify-confirm");
modifyConfirm.addEventListener("click", () => {
    modify_product();
});

// D : 데이터 삭제
function delete_product() {
    const productDetail = document.querySelector(".product-detail");
    const id = productDetail.classList.item(1);
    fetch(`products/${id}`, { method: "DELETE" })
        .then((res) => res.json())
        .then((data) => {
            window.location.reload();
        });
}

// 확인 모달 컨트롤
function control_confirm_modal() {
    // 모달 버튼 클릭 시 모달 열기
    // const modalDeleteBtn = document.getElementsByClassName("modal-delete-btn")[0];
    const modal = document.getElementById("confirm-modal");
    // modalDeleteBtn.addEventListener("click", () => {
    modal.style.display = "block";
    // });

    // 작업 종류 체크
    let btn_job = event.target.getAttribute("id");

    // 모달 닫기 버튼 클릭 시 모달 닫기
    const closeBtn = document.getElementsByClassName("confirm-close-btn")[0];
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // 아니오 버튼 클릭 시 모달 닫기
    const cancelBtn = document.getElementById("confirm-no-btn");
    cancelBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // 예 버튼 클릭 시 해당 작업 요청
    const confirmBtn = document.getElementById("confirm-yes-btn");
    confirmBtn.addEventListener("click", () => {
        if ((btn_job = "modal-delete-btn")) {
            delete_product();
        }
        modal.style.display = "none";
    });
}

// 이벤트 등록 : 상품 상세 정보 보기란에서 Delete 버튼 클릭 시, 확인 팝업창 열기
let deleteConfirm = document.querySelector(".btn-delete");
deleteConfirm.addEventListener("click", () => {
    control_confirm_modal();
});
