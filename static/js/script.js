$(document).ready(function () {
    show_products();
});

let category_list = {
    1: "패션",
    2: "전자제품",
    3: "음식",
    4: "화장품",
    5: "기타",
};

const itemsPerPage = 8; // 한 페이지에 보여줄 아이템 개수
let currentPage = 1; // 현재 페이지 번호
let currentProducts = []; // 현재 페이지에 표시될 아이템

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
                                    <h5 class="product-text" id="${item.id}" style="background-image:url('${item.image_url}')" onclick="show_product(this, ${item.id})">
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
            $(".product-detail").empty();
        });
}

// C : 데이터 단건 저장
function save_product() {
    let user = $("#RegisterModal .user").val();
    let name = $("#RegisterModal .name").val();
    let category = $("#RegisterModal .category option:selected").val();
    let price = $("#RegisterModal .price").val();
    let url = $("#RegisterModal .url").val();
    let description = $("#RegisterModal .description").val();
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

// R : 단건 데이터 조회
function show_product(elem, id) {
    fetch(`products/${id}`)
        .then((res) => res.json())
        .then((data) => {
            const productDetail = document.querySelector(
                ".product-detail-border"
            );
            if (
                elem &&
                productDetail &&
                id == productDetail.classList.item(1)
            ) {
                productDetail.remove();
            } else {
                $(".product-detail").empty();
                let product = data["product"];
                let user = product["user"];
                let name = product["name"];
                let price = `${product["price"].toLocaleString()}원`;
                let category_id = product["category"];
                let category_val = category_list[category_id];
                let url = product["url"];
                let image_url = product["image_url"];
                let description = product["description"];
                $(".product-detail")
                    .append(`<div class="product-detail-border ${id}">
                                                <div class="product-detail-top">
                                                    <div class="product-detail-img" style="background-image:url('${image_url}')"></div>
                                                    <table class="product-detail-table">
                                                        <tbody>
                                                            <tr>
                                                                <th class="product-detail-target">
                                                                    User
                                                                </td>
                                                                <td class="product-detail-content">
                                                                    ${user}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th class="product-detail-target">
                                                                    Product
                                                                </td>
                                                                <td class="product-detail-content">
                                                                    ${name}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th class="product-detail-target">
                                                                    Category
                                                                </td>
                                                                <td class="product-detail-content">
                                                                    ${category_val}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th class="product-detail-target">
                                                                    Price
                                                                </td>
                                                                <td class="product-detail-content">
                                                                    ${price}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th class="product-detail-target">
                                                                    URL
                                                                </td>
                                                                <td class="product-detail-content">
                                                                    <a href="${url}" target="_blank">바로가기 클릭</a>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div class="product-detail-middle">
                                                    <div class="product-detail-description-title">Description</div>
                                                    <div class="product-detail-description-content">
                                                        ${description}
                                                    </div>
                                                </div>
                                                <div class="product-detail-bottom">
                                                    <button type="button" class="btn btn-primary btn-modify"  data-bs-toggle="modal" data-bs-target="#ModifyModal" onmousedown='control_modify_modal()'>
                                                        Modify
                                                    </button>
                                                    <button type="button" class="btn btn-primary btn-delete" id="modal-delete-btn" onclick="control_confirm_modal()">
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>`);
            }
        });
}

// 기존에 저장된 데이터를 불러와 input box에 삽입
function control_modify_modal() {
    const productDetail = document.querySelector(".product-detail-border");
    const id = productDetail.classList.item(1);

    $("#ModifyModal").on("shown.bs.modal", function () {
        fetch(`products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                let product = data["product"];
                $("#ModifyModal .input-modal.user").val(product["user"]);
                $("#ModifyModal .input-modal.name").val(product["name"]);
                $("#ModifyModal .input-modal.price").val(product["price"]);
                $(
                    '#ModifyModal .input-modal.category option[value="' +
                        product["category"] +
                        '"]'
                ).attr("selected", true);
                $("#ModifyModal .input-modal.url").val(product["url"]);
                $("#ModifyModal .input-modal.description").val(
                    product["description"]
                );
            });
    });
}

// U : 데이터 수정
function modify_product() {
    const productDetail = document.querySelector(".product-detail-border");
    const id = productDetail.classList.item(1);

    let user = $("#ModifyModal .user").val();
    let name = $("#ModifyModal .name").val();
    let category = $("#ModifyModal .category option:selected").val();
    let price = $("#ModifyModal .price").val();
    let url = $("#ModifyModal .url").val();
    let description = $("#ModifyModal .description").val();
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
            document.body.style = "None";
            modal.style.display = "none";
            modal.classList.remove("show");
            // $("#ModifyModal").on("hidden.bs.modal", function () {
            //     this.setAttribute("aria-hidden", "true");
            // });
            show_product(null, id);
        });
}

// D : 데이터 삭제
function delete_product() {
    let pClass = document.querySelector(".product-detail-border");
    let id = pClass.className.split(" ")[1];
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
