// THREADORA demo cart and checkout. This is a front-end assignment demo, not a real payment system.
(function(){
  let cart = [];
  function money(n){ return '₹' + Number(n).toLocaleString('en-IN'); }
  const prices = {
    'Classic Linen Shirt':1299,'Summer Linen Shirt':1099,
    'Everyday Cotton Shirt':899,'Oxford Cotton Shirt':1049,
    'Printed Rayon Shirt':999,'Solid Rayon Shirt':949,
    'Classic Formal Shirt':1199,'Evening Party Shirt':1399
  };
  function ensureCheckout(){
    if(document.getElementById('checkoutOverlay')) return;
    const overlay=document.createElement('div');
    overlay.id='checkoutOverlay'; overlay.className='checkout-overlay';
    overlay.innerHTML=`
      <section class="checkout-panel" role="dialog" aria-modal="true" aria-labelledby="checkoutTitle">
        <button type="button" class="checkout-close" aria-label="Close checkout">×</button>
        <p class="eyebrow">THREADORA CHECKOUT</p><h2 id="checkoutTitle">Where should we deliver?</h2>
        <p class="checkout-subtitle">Add your delivery address and review your demo order.</p>
        <div id="checkoutItems" class="checkout-items"></div>
        <form id="checkoutForm" class="checkout-form">
          <label for="customerName">Full name</label><input id="customerName" name="customerName" required placeholder="Enter full name" autocomplete="name">
          <label for="customerPhone">Mobile number</label><input id="customerPhone" name="customerPhone" required inputmode="numeric" pattern="[0-9]{10}" maxlength="10" placeholder="10-digit mobile number" autocomplete="tel">
          <label for="pinCode">PIN code</label><input id="pinCode" name="pinCode" required inputmode="numeric" pattern="[0-9]{6}" maxlength="6" placeholder="6-digit PIN code" autocomplete="postal-code">
          <label for="addressLine">House no., building, street</label><input id="addressLine" name="addressLine" required placeholder="House / flat / street" autocomplete="street-address">
          <label for="landmark">Locality / landmark</label><input id="landmark" name="landmark" placeholder="Area or nearby landmark">
          <div class="checkout-two"><div><label for="city">City</label><input id="city" name="city" required placeholder="City" autocomplete="address-level2"></div><div><label for="state">State</label><input id="state" name="state" required placeholder="State" autocomplete="address-level1"></div></div>
          <label for="deliveryType">Address type</label><select id="deliveryType" name="deliveryType"><option>Home</option><option>Work</option><option>Other</option></select>
          <div class="checkout-total"><span>Demo order total</span><strong id="checkoutTotal">₹0</strong></div>
          <button class="btn checkout-submit" type="submit">Place Demo Order</button>
          <small>Student project demo only: no payment is collected and no real order is sent.</small>
          <p id="checkoutMessage" aria-live="polite"></p>
        </form>
      </section>`;
    document.body.appendChild(overlay);
    overlay.querySelector('.checkout-close').addEventListener('click',()=>overlay.classList.remove('show'));
    overlay.addEventListener('click',e=>{if(e.target===overlay)overlay.classList.remove('show');});
    overlay.querySelector('#checkoutForm').addEventListener('submit',e=>{
      e.preventDefault();
      const form=e.currentTarget;
      if(!form.reportValidity()) return;
      const orderNo='THR'+Math.floor(100000+Math.random()*900000);
      document.getElementById('checkoutMessage').textContent='Demo order placed successfully! Order reference: '+orderNo+'. This is only a website preview; no order was sent to a store.';
      const submit=overlay.querySelector('.checkout-submit'); submit.textContent='Demo Order Placed ✓'; submit.disabled=true;
    });
  }
  function renderCheckout(){
    ensureCheckout();
    const items=document.getElementById('checkoutItems');
    const total=cart.reduce((sum,item)=>sum+prices[item],0);
    items.innerHTML=cart.map(item=>`<div class="checkout-item"><span>${item}</span><strong>${money(prices[item]||0)}</strong></div>`).join('');
    document.getElementById('checkoutTotal').textContent=money(total);
    document.getElementById('checkoutMessage').textContent='';
    const form=document.getElementById('checkoutForm');
    form.reset(); const submit=form.querySelector('.checkout-submit'); submit.disabled=false; submit.textContent='Place Demo Order';
    document.getElementById('checkoutOverlay').classList.add('show');
  }
  document.querySelectorAll('.add-cart').forEach(button=>{
    button.addEventListener('click',()=>{
      const name=button.dataset.product; cart.push(name);
      button.textContent='Added ✓';
      const message=document.querySelector('.cart-message');
      if(message) message.textContent=name+' added to your cart. Open checkout to enter delivery address.';
      renderCheckout();
    });
  });
  document.querySelectorAll('.buy-now').forEach(button=>{
    button.addEventListener('click',()=>{cart=[button.dataset.product];renderCheckout();});
  });
  const form=document.getElementById('contactForm');
  if(form){form.addEventListener('submit',event=>{event.preventDefault();document.getElementById('formMessage').textContent='Thank you! This demo form does not send/store messages. Please email souravverm101@gmail.com for a real response.';form.reset();});}
})();