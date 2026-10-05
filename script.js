let emergencies = [];

function reportEmergency() {

    let name =
        document.getElementById("name").value;

    let location =
        document.getElementById("location").value;

    let type =
        document.getElementById("type").value;

    let priority =
        document.getElementById("priority").value;

    let description =
        document.getElementById("description").value;

    if (
        name === "" ||
        location === "" ||
        type === "" ||
        priority === "" ||
        description === ""
    ) {

        document.getElementById("message").innerText =
            "Please fill all the fields.";

        return;
    }

    let emergency = {

        name: name,

        location: location,

        type: type,

        priority: priority,

        description: description,

        status: "Pending"
    };

    emergencies.push(emergency);

    displayEmergencies();

    document.getElementById("name").value = "";

    document.getElementById("location").value = "";

    document.getElementById("type").value = "";

    document.getElementById("priority").value = "";

    document.getElementById("description").value = "";

    document.getElementById("message").innerText =
        "Emergency report submitted successfully.";
}

function displayEmergencies() {

    let list =
        document.getElementById("requestList");

    list.innerHTML = "";

    emergencies.forEach(function(emergency, index) {

        let card =
            document.createElement("div");

        card.className = "request-card";

        let priorityClass =
            emergency.priority.toLowerCase();

        let statusClass =
            emergency.status.toLowerCase();

        card.innerHTML = `

            <h3>${emergency.type}</h3>

            <p>
                <strong>Name:</strong>
                ${emergency.name}
            </p>

            <p>
                <strong>Location:</strong>
                ${emergency.location}
            </p>

            <p>
                <strong>Description:</strong>
                ${emergency.description}
            </p>

            <p>
                <strong>Priority:</strong>
                <span class="${priorityClass}">
                    ${emergency.priority}
                </span>
            </p>

            <p>
                <strong>Status:</strong>
                <span class="${statusClass}">
                    ${emergency.status}
                </span>
            </p>

            ${
                emergency.status === "Pending"
                ?
                `<button
                    class="resolve-btn"
                    onclick="resolveEmergency(${index})">
                    Mark as Resolved
                </button>`
                :
                ""
            }

        `;

        list.appendChild(card);
    });

    updateDashboard();
}

function resolveEmergency(index) {

    emergencies[index].status = "Resolved";

    displayEmergencies();
}

function updateDashboard() {

    let total =
        emergencies.length;

    let pending =
        emergencies.filter(
            emergency =>
            emergency.status === "Pending"
        ).length;

    let resolved =
        emergencies.filter(
            emergency =>
            emergency.status === "Resolved"
        ).length;

    document.getElementById("totalReports").innerText =
        total;

    document.getElementById("pendingReports").innerText =
        pending;

    document.getElementById("resolvedReports").innerText =
        resolved;
}