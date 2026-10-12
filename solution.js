let reservation = {
    startDate: null,
    endDate: null,
    guestsCount: 0,
    roomType: null,
    name: null,
    phone: null,
    email: null
};

function changeContent(className) {
    document.querySelectorAll('.custom-form').forEach(div => {
        div.classList.add('hidden');
    });

    const element = document.querySelector(`.${className}`);

    if (element) {
        element.classList.remove('hidden');
    }
}

// 1. Search form -> Offers
document.querySelector('#search-form-button').addEventListener('click', function (e) {
    e.preventDefault();

    const checkIn = document.querySelector('#check-in').value;
    const checkOut = document.querySelector('#check-out').value;
    const people = Number(document.querySelector('#people').value);

    if (!checkIn || !checkOut || people < 1) {
        alert('Моля, попълнете всички полета!');
        return;
    }

    if (checkOut <= checkIn) {
        alert('Датата на напускане трябва да е след датата на настаняване!');
        return;
    }

    reservation.startDate = checkIn;
    reservation.endDate = checkOut;
    reservation.guestsCount = people;

    changeContent('search-result-form-content');
});

// 2. Select room
document.querySelectorAll('.room-type').forEach(room => {
    room.addEventListener('click', function () {
        document.querySelectorAll('.room-type').forEach(r => {
            r.classList.remove('selected-room');
        });

        this.classList.add('selected-room');

        reservation.roomType = this.querySelector('h4').textContent;
    });
});

// Set default room
const defaultRoom = document.querySelector('.selected-room');
if (defaultRoom) {
    reservation.roomType = defaultRoom.querySelector('h4').textContent;
}

// 3. Offers -> Search
document.querySelector('#search-back-btn').addEventListener('click', function (e) {
    e.preventDefault();
    changeContent('search-form-content');
});

// 4. Offers -> Personal Information
document.querySelector('#search-next-btn').addEventListener('click', function (e) {
    e.preventDefault();
    changeContent('guest-details-form-content');
});

// 5. Personal Information -> Offers
document.querySelector('#guest-details-back-btn').addEventListener('click', function (e) {
    e.preventDefault();
    changeContent('search-result-form-content');
});

// 6. Personal Information -> Confirmation
document.querySelector('#guest-details-next-btn').addEventListener('click', function (e) {
    e.preventDefault();

    const name = document.querySelector('#name').value.trim();
    const phone = document.querySelector('#phone-number').value.trim();
    const email = document.querySelector('#email').value.trim();

    if (!name || !phone || !email) {
        alert('Моля, попълнете всички лични данни!');
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Моля, въведете валиден имейл адрес!');
        return;
    }

    reservation.name = name;
    reservation.phone = phone;
    reservation.email = email;

    document.querySelector('#guest-name').textContent = 'Name: ' + reservation.name;
    document.querySelector('#guest-phone').textContent = 'Phone Number: ' + reservation.phone;
    document.querySelector('#guest-email').textContent = 'Email: ' + reservation.email;
    document.querySelector('#guest-room-type').textContent = 'Room Type: ' + reservation.roomType;
    document.querySelector('#guest-data-in').textContent = 'Date-in: ' + reservation.startDate;
    document.querySelector('#guest-data-out').textContent = 'Date-out: ' + reservation.endDate;

    changeContent('confirm-reservation-content');
});

// 7. Confirmation -> Personal Information
document.querySelector('#confirm-back-btn').addEventListener('click', function (e) {
    e.preventDefault();
    changeContent('guest-details-form-content');
});

// 8. Confirm reservation -> Thank you
document.querySelector('#confirm-reservation').addEventListener('click', function (e) {
    e.preventDefault();
    changeContent('thank-you-content');
});

// 9. New reservation
document.querySelector('#new-reservation').addEventListener('click', function (e) {
    e.preventDefault();

    reservation = {
        startDate: null,
        endDate: null,
        guestsCount: 0,
        roomType: null,
        name: null,
        phone: null,
        email: null
    };

    document.querySelector('#check-in').value = '';
    document.querySelector('#check-out').value = '';
    document.querySelector('#people').value = '';
    document.querySelector('#name').value = '';
    document.querySelector('#phone-number').value = '';
    document.querySelector('#email').value = '';

    document.querySelectorAll('.room-type').forEach(room => {
        room.classList.remove('selected-room');
    });

    const firstRoom = document.querySelector('.room-type');
    if (firstRoom) {
        firstRoom.classList.add('selected-room');
        reservation.roomType = firstRoom.querySelector('h4').textContent;
    }

    changeContent('search-form-content');
});
changeContent('search-form-content');
document.querySelector('#search-form-button').addEventListener('click', (e) => searchFormData(e));

function searchFormData(e) {
    e.preventDefault();
    const data = e.target.parentElement;
    const checkIn = data.querySelector('#check-in').value;
    const checkOut = data.querySelector('#check-out').value;
    const people = data.querySelector('#people').value;
    if (checkIn != '' && checkOut != '' && people != '' &&
        new Date(checkIn) <= new Date(checkOut)) {
        reservation.startDate = checkIn;
        reservation.endDate = checkOut;
        reservation.guestsCount = people;
        console.log(reservation);
        changeContent('search-result-form-content');
    }
}

document.querySelector('#search-back-btn').addEventListener('click', (e) => fillSearchForm(e));

function fillSearchForm(e) {
    e.preventDefault();
    changeContent('search-form-content');
    document.querySelector('#check-in').value = reservation.startDate;
    document.querySelector('#check-out').value = reservation.endDate;
    document.querySelector('#people').value = reservation.guestsCount;
}


document.querySelectorAll('.room-type').forEach(room => {
    room.addEventListener("click", (e) => selectRoomType(e))
});

function selectRoomType(e) {
    let myTarget = undefined;
    e.preventDefault;
    if (e.target.querySelector('img') != null) {
        myTarget = e.target;
    } else {
        myTarget = e.target.parentElement;
    }
    document.querySelectorAll('.room-type').forEach(room =>
        room.classList.remove('selected-room'));
    myTarget.classList.add('selected-room');
}

document.querySelector('#search-next-btn').addEventListener('click', (e) => findRoom(e));

function findRoom(e) {
    e.preventDefault();
    const roomInfo = e.target.parentElement.parentElement.querySelector('.selected-room h4').textContent;
    reservation.roomType = roomInfo;
    console.log(reservation);
    changeContent('guest-details-form-content');

}

document.querySelector('#guest-details-back-btn').addEventListener('click', (e) => fillRoomForm(e));

function fillRoomForm(e) {
    e.preventDefault();
    changeContent('search-result-form-content');
}

document.querySelector('#guest-details-next-btn').addEventListener('click', (e) => getPersonalData(e));

function getPersonalData(e) {
    e.preventDefault();
    const data = e.target.parentElement.parentElement;

    const name = data.querySelector('#name').value;
    const phone = data.querySelector('#phone-number').value;
    const email = data.querySelector('#email').value;

    if (name != '' && phone != '' && email != '') {
        reservation.name = name;
        reservation.phone = phone;
        reservation.email = email;
        console.log(reservation);
        changeContent('confirm-reservation-content');
        fillConfirmReservationData(reservation);
    }
}

function fillConfirmReservationData(customReservation) {
    document.querySelector('.confirm-reservation #guest-name').textContent = `Name: ${customReservation.name}`;
    document.querySelector('.confirm-reservation #guest-phone').textContent = `Phone Number: ${customReservation.phone}`;
    document.querySelector('.confirm-reservation #guest-email').textContent = `Email: ${customReservation.email}`;
    document.querySelector('.confirm-reservation #guest-room-type').textContent = `Room Type: ${customReservation.roomType}`;
    document.querySelector('.confirm-reservation #guest-data-in').textContent = `Date-in: ${customReservation.startDate}`;
    document.querySelector('.confirm-reservation #guest-data-out').textContent = `Date-out: ${customReservation.endDate}`;
}


