const yesMessages = [
    "Bagay Kayo UWU",
    "Edi Sana All",
    "Poreber mo na sya",
    "Ayieee, Gusto ka rin daw niya!"
];

const noMessages = [
    "Di kayo para sa isat isa",
    "Sumuko ka na lang",
    "Kalokohan lang ang nararamdaman mo",
    "Poreber mo na sya",
    "Asa ka naman",
    "Wag na, siya na lang"
];

let resultShown = false; // Flag upang malaman kung naipakita na ang resulta

function saveData(userName, crushName, isCrush) {
    db.collection("crushmates").add({
        userName: userName,
        crushName: crushName,
        isCrush: isCrush,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        console.log("Data saved successfully!");
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}


function showRandomMessage(messages) {
    const randomIndex = Math.floor(Math.random() * messages.length);
    document.getElementById('result').innerText = messages[randomIndex];
    document.getElementById('result').style.display = 'block';
    resultShown = true;
}

function showModal() {
    document.getElementById('myModal').style.display = 'block';
}

function hideModal() {
    document.getElementById('myModal').style.display = 'none';
}

function resetForm() {
    document.getElementById('crushForm').reset();
    document.getElementById('result').style.display = 'none';
    resultShown = false;
}

function checkInputsAndShow(buttonType) {
    const crushName = document.getElementById('crushName').value;
    const crushAge = document.getElementById('crushAge').value;

    if (crushName && crushAge) {
        if (!resultShown) {
            if (buttonType === 'yes') {
                showRandomMessage(yesMessages);
            } else {
                showRandomMessage(noMessages);
            }
            showModal();
        }
    } else {
        alert("Pakisiguradong punan ang lahat ng fields.");
    }
}

document.getElementById('yesButton').addEventListener('click', function() {
    checkInputsAndShow('yes');
});

document.getElementById('noButton').addEventListener('click', function() {
    checkInputsAndShow('no');
});

// Close modal kapag pinindot ang close button
document.querySelector('.close').addEventListener('click', function() {
    hideModal();
    resetForm();
});

// Close modal at i-reset ang form kapag pinindot ang labas ng modal
document.getElementById('myModal').addEventListener('click', function(event) {
    if (event.target == this) {
        hideModal();
        resetForm();
    }
});

// Ipakita ang modal
function showModal() {
    const modal = document.getElementById("myModal");
    modal.classList.add("show");
    modal.style.display = "block";
}

// Isara ang modal
function closeModal() {
    const modal = document.getElementById("myModal");
    modal.classList.remove("show");
    modal.style.display = "none";
}

