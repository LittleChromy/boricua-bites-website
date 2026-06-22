// Menu Tab Navigation
function showCategory(categoryId) {
    // Hide all categories
    const categories = document.querySelectorAll('.menu-category');
    categories.forEach(cat => cat.classList.remove('active'));

    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Show selected category
    const selectedCategory = document.getElementById(categoryId);
    if (selectedCategory) {
        selectedCategory.classList.add('active');
    }

    // Add active class to clicked tab
    event.target.classList.add('active');
}

// Order Form Functions
function addItem() {
    const orderItems = document.getElementById('orderItems');
    const newRow = document.createElement('div');
    newRow.className = 'order-item-row';
    newRow.innerHTML = `
        <select class="item-select">
            <option value="">Select an item</option>
            <option value="avena">Avena w/ Cinnamon - $3.45</option>
            <option value="pina-colada">Piña Colada - $8.05</option>
            <option value="orange-juice">Orange Juice - $3.45</option>
            <option value="apple-juice">Apple Juice - $3.45</option>
            <option value="alcapurria">Alcapurria - $4.60</option>
            <option value="mac-cheese-bites">Mac & Cheese Bites - $8.05</option>
            <option value="mozzarella-sticks">Mozzarella Sticks - $8.05</option>
            <option value="boricua-salad">Boricua House Salad - $13.80</option>
            <option value="mofongo-balls">Mofongo Balls - $6.90</option>
            <option value="shrimp-garlic">Shrimp w/ Garlic Sauce - $16.10</option>
            <option value="mata-monchy">Mata Monchy Bowl - $9.20</option>
            <option value="monchy-box">Late Night Monchy Box - $40.25</option>
        </select>
        <input type="number" class="item-quantity" placeholder="Qty" min="1" value="1">
        <button type="button" class="btn-remove" onclick="removeItem(this)">Remove</button>
    `;
    orderItems.appendChild(newRow);
}

function removeItem(button) {
    button.parentElement.remove();
}

// Order Form Submission
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const orderType = document.getElementById('orderType').value;
    const address = document.getElementById('address').value;
    const notes = document.getElementById('notes').value;
    const payment = document.getElementById('payment').value;

    // Get order items
    const items = [];
    const itemRows = document.querySelectorAll('.order-item-row');
    itemRows.forEach(row => {
        const itemSelect = row.querySelector('.item-select');
        const quantity = row.querySelector('.item-quantity');
        if (itemSelect.value) {
            items.push(`${itemSelect.options[itemSelect.selectedIndex].text} x ${quantity.value}`);
        }
    });

    // Validate items
    if (items.length === 0) {
        alert('Please select at least one item for your order.');
        return;
    }

    // Validate delivery address if delivery is selected
    if (orderType === 'delivery' && !address.trim()) {
        alert('Please provide a delivery address.');
        return;
    }

    // Create order summary
    const orderSummary = `
========================================
BORICUA BITES ORDER
========================================

CUSTOMER INFORMATION:
Name: ${name}
Phone: ${phone}
Email: ${email || 'Not provided'}

ORDER TYPE: ${orderType.toUpperCase()}
${orderType === 'delivery' ? `Delivery Address: ${address}` : ''}

ORDER ITEMS:
${items.join('\n')}

SPECIAL INSTRUCTIONS:
${notes || 'None'}

PAYMENT METHOD: ${payment === 'cash' ? 'Cash' : 'Credit/Debit Card'}

========================================
Thank you for ordering with Boricua Bites!
We'll confirm your order shortly.
========================================
    `;

    // Log to console (for demonstration)
    console.log(orderSummary);

    // Show confirmation message
    alert(`Thank you for your order, ${name}!\n\nWe received your order and will contact you at ${phone} to confirm.\n\nOrder Summary:\n${items.join('\n')}\n\n📞 Call us at (413) 301-6288 if you have any questions!`);

    // Reset form
    document.getElementById('orderForm').reset();
    document.getElementById('orderItems').innerHTML = `
        <div class="order-item-row">
            <select class="item-select">
                <option value="">Select an item</option>
                <option value="avena">Avena w/ Cinnamon - $3.45</option>
                <option value="pina-colada">Piña Colada - $8.05</option>
                <option value="orange-juice">Orange Juice - $3.45</option>
                <option value="apple-juice">Apple Juice - $3.45</option>
                <option value="alcapurria">Alcapurria - $4.60</option>
                <option value="mac-cheese-bites">Mac & Cheese Bites - $8.05</option>
                <option value="mozzarella-sticks">Mozzarella Sticks - $8.05</option>
                <option value="boricua-salad">Boricua House Salad - $13.80</option>
                <option value="mofongo-balls">Mofongo Balls - $6.90</option>
                <option value="shrimp-garlic">Shrimp w/ Garlic Sauce - $16.10</option>
                <option value="mata-monchy">Mata Monchy Bowl - $9.20</option>
                <option value="monchy-box">Late Night Monchy Box - $40.25</option>
            </select>
            <input type="number" class="item-quantity" placeholder="Qty" min="1" value="1">
            <button type="button" class="btn-remove" onclick="removeItem(this)">Remove</button>
        </div>
    `;
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize first menu category
document.addEventListener('DOMContentLoaded', function() {
    const firstCategory = document.getElementById('breakfast');
    if (firstCategory) {
        firstCategory.classList.add('active');
    }
    const firstTab = document.querySelector('.tab-btn');
    if (firstTab) {
        firstTab.classList.add('active');
    }
});