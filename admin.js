// Load subscribers from localStorage
function loadSubscribers() {
    const subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];
    updateSubscribersList(subscribers);
    updateSubscriberCount(subscribers.length);
}

// Update subscribers list in the table
function updateSubscribersList(subscribers) {
    const subscribersList = document.getElementById('subscribers-list');
    subscribersList.innerHTML = '';

    subscribers.forEach(subscriber => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${subscriber.email}</td>
            <td>${new Date(subscriber.date).toLocaleDateString()}</td>
            <td><span class="status-${subscriber.status}">${subscriber.status}</span></td>
            <td>
                <button class="action-btn" onclick="toggleSubscriberStatus('${subscriber.email}')">
                    <i class="fas fa-sync-alt"></i>
                </button>
                <button class="action-btn" onclick="deleteSubscriber('${subscriber.email}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        subscribersList.appendChild(row);
    });
}

// Update subscriber count in dashboard
function updateSubscriberCount(count) {
    document.getElementById('subscriber-count').textContent = count;
}

// Toggle subscriber status (active/inactive)
function toggleSubscriberStatus(email) {
    const subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];
    const subscriber = subscribers.find(s => s.email === email);
    if (subscriber) {
        subscriber.status = subscriber.status === 'active' ? 'inactive' : 'active';
        localStorage.setItem('subscribers', JSON.stringify(subscribers));
        loadSubscribers();
    }
}

// Delete subscriber
function deleteSubscriber(email) {
    if (confirm('Are you sure you want to delete this subscriber?')) {
        const subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];
        const updatedSubscribers = subscribers.filter(s => s.email !== email);
        localStorage.setItem('subscribers', JSON.stringify(updatedSubscribers));
        loadSubscribers();
    }
}

// Search subscribers
document.getElementById('subscriber-search').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];
    const filteredSubscribers = subscribers.filter(s => 
        s.email.toLowerCase().includes(searchTerm)
    );
    updateSubscribersList(filteredSubscribers);
});

// Export subscribers to CSV
document.getElementById('export-subscribers').addEventListener('click', () => {
    const subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];
    const csvContent = "data:text/csv;charset=utf-8," 
        + "Email,Date Subscribed,Status\n"
        + subscribers.map(s => `${s.email},${new Date(s.date).toLocaleDateString()},${s.status}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "subscribers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Initialize the admin dashboard
document.addEventListener('DOMContentLoaded', loadSubscribers); 