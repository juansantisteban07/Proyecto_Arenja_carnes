// ====================================================
// 1. DATOS DE PRODUCTOS
// ====================================================

const productos = [
  {
    id: 1,
    nombre: "Lomo Fino",
    tipo: "Filete / Loin",
    imagen: "img/lomo fino.png",
    descripcion: "El corte más tierno de la res. Ideal para filetes y medallones. Textura suave y sabor inigualable.",
    precio: 42000,
    etiqueta: "Premium"
  },
  {
    id: 2,
    nombre: "Punta de Anca",
    tipo: "Rump Cap",
    imagen: "img/punta anca.png",
    descripcion: "Corte jugoso de la parte trasera. Perfecto para la parrilla. El favorito de los colombianos.",
    precio: 28000,
    etiqueta: "Popular"
  },
  {
    id: 3,
    nombre: "Costilla de Res",
    tipo: "Beef Ribs",
    imagen: "img/costillas de res.png",
    descripcion: "Costillas carnosas y llenas de sabor. Perfectas para asados, sopas y guisos familiares.",
    precio: 18000,
    etiqueta: "Familiar"
  },
  {
    id: 4,
    nombre: "Sobrebarriga",
    tipo: "Flank Steak",
    imagen: "img/sobrebarriga.png",
    descripcion: "Ideal para cocido y sancocho. Muy popular en la gastronomía colombiana. Sabor profundo.",
    precio: 22000,
    etiqueta: "Tradicional"
  },
  {
    id: 5,
    nombre: "Bife Angosto",
    tipo: "Sirloin Strip",
    imagen: "img/bife angosto.png",
    descripcion: "Corte de lomo con intenso sabor. Perfecto a la parrilla para los amantes de la carne.",
    precio: 35000,
    etiqueta: "Premium"
  },
  {
    id: 6,
    nombre: "Paquete Económico",
    tipo: "Res variada",
    imagen: "img/paquete economico.png",
    descripcion: "Mezcla de cortes seleccionados: molida, pecho y osobuco. Ideal para familia numerosa.",
    precio: 14000,
    etiqueta: "Oferta"
  }
];


// ====================================================
// 2. DATOS DE LA TABLA DE PRECIOS
// ====================================================

const tablaPrecios = [
  { corte: "Lomo Fino",          p1: 42000, p5: 39000, p10: 36000, p25: 33000, tipo: "Premium"   },
  { corte: "Punta de Anca",      p1: 28000, p5: 26000, p10: 24000, p25: 22000, tipo: "Premium"   },
  { corte: "Bife Angosto",       p1: 35000, p5: 32000, p10: 29000, p25: 26500, tipo: "Premium"   },
  { corte: "Sobrebarriga",       p1: 22000, p5: 20500, p10: 19000, p25: 17500, tipo: "Estándar"  },
  { corte: "Costilla",           p1: 18000, p5: 16500, p10: 15000, p25: 13500, tipo: "Estándar"  },
  { corte: "Molida Especial",    p1: 16000, p5: 14800, p10: 13500, p25: 12500, tipo: "Económico" },
  { corte: "Osobuco",            p1: 19000, p5: 17500, p10: 16000, p25: 14500, tipo: "Estándar"  },
  { corte: "Paquete Económico",  p1: 14000, p5: 13000, p10: 12000, p25: 10500, tipo: "Económico" }
];


// ====================================================
// 3. ESTADO DEL CARRITO
// ====================================================

let carrito = [];

const WHATSAPP = "573193619999";


// ====================================================
// 4. NAVBAR - CAMBIO AL HACER SCROLL
// ====================================================

window.addEventListener("scroll", function() {
  var navbar = document.getElementById("navbar");

  if (window.scrollY > 60) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


// ====================================================
// 5. MENU MOVIL - HAMBURGUESA
// ====================================================

function toggleMenu() {
  var menu = document.getElementById("menu");
  menu.classList.toggle("abierto");
}

var linksMenu = document.querySelectorAll(".menu a");
linksMenu.forEach(function(link) {
  link.addEventListener("click", function() {
    document.getElementById("menu").classList.remove("abierto");
  });
});


// ====================================================
// 6. CARRITO - ABRIR Y CERRAR EL PANEL
// ====================================================

function abrirCarrito() {
  document.getElementById("panelCarrito").classList.add("abierto");
  document.getElementById("overlay").classList.add("activo");
}

function cerrarCarrito() {
  document.getElementById("panelCarrito").classList.remove("abierto");
  document.getElementById("overlay").classList.remove("activo");
}


// ====================================================
// 7. CARRITO - AGREGAR PRODUCTO
// ====================================================

function agregarAlCarrito(productoId) {
  var producto = productos.find(function(p) {
    return p.id === productoId;
  });

  if (!producto) return;

  var yaExiste = carrito.find(function(item) {
    return item.id === productoId;
  });

  if (yaExiste) {
    yaExiste.kg = yaExiste.kg + 1;
  } else {
    carrito.push({
      id:     producto.id,
      nombre: producto.nombre,
      tipo:   producto.tipo,
      imagen: producto.imagen,
      precio: producto.precio,
      kg:     1
    });
  }

  dibujarCarrito();
  mostrarNotificacion("✅ " + producto.nombre + " agregado");
}


// ====================================================
// 8. CARRITO - ELIMINAR PRODUCTO
// ====================================================

function eliminarDelCarrito(productoId) {
  carrito = carrito.filter(function(item) {
    return item.id !== productoId;
  });

  dibujarCarrito();
}


// ====================================================
// 9. CARRITO - ACTUALIZAR KILOGRAMOS
// ====================================================

function actualizarKg(productoId, nuevoValor) {
  var item = carrito.find(function(i) {
    return i.id === productoId;
  });

  if (!item) return;

  var kg = parseFloat(nuevoValor);

  if (!kg || kg <= 0) {
    eliminarDelCarrito(productoId);
    return;
  }

  item.kg = kg;
  dibujarCarrito();
}


// ====================================================
// 10. CARRITO - DIBUJAR (RENDERIZAR)
// ====================================================

function dibujarCarrito() {
  var lista      = document.getElementById("carritoLista");
  var vacio      = document.getElementById("carritoVacio");
  var pie        = document.getElementById("carritoPie");
  var numero     = document.getElementById("carritoNumero");
  var totalEl    = document.getElementById("carritoTotal");

  if (carrito.length === 0) {
    vacio.style.display  = "block";
    pie.style.display    = "none";
    numero.style.display = "none";
    lista.innerHTML      = "";
    lista.appendChild(vacio);
    return;
  }

  vacio.style.display  = "none";
  pie.style.display    = "block";
  numero.style.display = "flex";
  numero.textContent   = carrito.length;

  var total = 0;
  carrito.forEach(function(item) {
    total = total + (item.precio * item.kg);
  });

  totalEl.textContent = formatearPrecio(total);

  lista.innerHTML = "";
  lista.appendChild(vacio);

  carrito.forEach(function(item) {
    var subtotal = item.precio * item.kg;

    var div = document.createElement("div");
    div.className = "item-carrito";

    div.innerHTML =
      // ↓ CAMBIO: <img> en lugar del emoji directo
      '<div class="item-emoji">' +
        '<img src="' + item.imagen + '" alt="' + item.nombre + '" ' +
        'style="width:48px;height:48px;object-fit:cover;border-radius:8px;">' +
      '</div>' +
      '<div class="item-info">' +
        '<div class="item-nombre">' + item.nombre + '</div>' +
        '<div class="item-tipo">' + item.tipo + '</div>' +
        '<div class="item-controles">' +
          '<button class="btn-cantidad" onclick="actualizarKg(' + item.id + ', ' + (item.kg - 0.5) + ')">−</button>' +
          '<input class="input-kg" type="number" min="0.5" step="0.5" value="' + item.kg + '" onchange="actualizarKg(' + item.id + ', this.value)">' +
          '<span class="texto-kg">kg</span>' +
          '<button class="btn-cantidad" onclick="actualizarKg(' + item.id + ', ' + (item.kg + 0.5) + ')">+</button>' +
        '</div>' +
      '</div>' +
      '<div class="item-derecha">' +
        '<div class="item-precio">' + formatearPrecio(subtotal) + '</div>' +
        '<div class="item-precio-kg">' + formatearPrecio(item.precio) + '/kg</div>' +
        '<button class="btn-eliminar" onclick="eliminarDelCarrito(' + item.id + ')">🗑</button>' +
      '</div>';

    lista.appendChild(div);
  });
}


// ====================================================
// 11. CARRITO - ENVIAR COTIZACION A WHATSAPP
// ====================================================

function enviarCarritoWhatsapp() {
  if (carrito.length === 0) return;

  var mensaje = "🥩 *COTIZACIÓN - Arenja Premium*\n\n";

  var total = 0;

  carrito.forEach(function(item) {
    var subtotal = item.precio * item.kg;
    total = total + subtotal;
    mensaje += "• *" + item.nombre + "*: " + item.kg + " kg × " + formatearPrecio(item.precio) + "/kg = *" + formatearPrecio(subtotal) + "*\n";
  });

  mensaje += "\n💰 *TOTAL ESTIMADO: " + formatearPrecio(total) + "*\n\n";
  mensaje += "Por favor confirmar disponibilidad y precios finales.";

  var url = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(mensaje);
  window.open(url, "_blank");
}


// ====================================================
// 12. FORMULARIO DE CONTACTO - ENVIAR A WHATSAPP
// ====================================================

function enviarFormulario() {
  var nombre       = document.getElementById("nombre").value.trim();
  var telefono     = document.getElementById("telefono").value.trim();
  var tipo         = document.getElementById("tipoCliente").value;
  var mensajeCampo = document.getElementById("mensaje").value.trim();

  if (nombre === "" || telefono === "") {
    mostrarNotificacion("⚠️ Por favor complete nombre y teléfono");
    return;
  }

  var msg = "🥩 *Solicitud de Cotización - Arenja Premium*\n\n";
  msg += "👤 *Nombre:* " + nombre + "\n";
  msg += "📱 *Teléfono:* " + telefono + "\n";

  if (tipo !== "") {
    msg += "🏢 *Tipo de cliente:* " + tipo + "\n";
  }

  if (mensajeCampo !== "") {
    msg += "\n📝 *Mensaje:*\n" + mensajeCampo;
  }

  var url = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(msg);
  window.open(url, "_blank");
}


// ====================================================
// 13. CREAR LAS TARJETAS DE PRODUCTOS
// ↓ CAMBIO: se usa <img class="producto-foto"> en lugar del emoji
// ====================================================

function crearTarjetasProductos() {
  var grid = document.getElementById("gridProductos");

  productos.forEach(function(p) {

    var tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-producto";

    tarjeta.innerHTML =
      '<div class="producto-imagen">' +
        // ↓ CAMBIO: imagen real en vez de p.emoji
        '<img src="' + p.imagen + '" alt="' + p.nombre + '" class="producto-foto">' +
        '<span class="producto-etiqueta">' + p.etiqueta + '</span>' +
      '</div>' +
      '<div class="producto-cuerpo">' +
        '<div class="producto-nombre">' + p.nombre + '</div>' +
        '<div class="producto-tipo">' + p.tipo + '</div>' +
        '<p class="producto-descripcion">' + p.descripcion + '</p>' +
        '<div class="producto-pie">' +
          '<div class="producto-precio">' +
            '<strong>' + formatearPrecio(p.precio) + '</strong>' +
            '<small>por kg · IVA incluido</small>' +
          '</div>' +
          '<button class="btn-agregar" onclick="agregarAlCarrito(' + p.id + ')">+ Cotizar</button>' +
        '</div>' +
      '</div>';

    grid.appendChild(tarjeta);
  });
}


// ====================================================
// 14. CREAR LAS FILAS DE LA TABLA DE PRECIOS
// ====================================================

function crearTablaPrecios() {
  var tbody = document.getElementById("cuerpoTabla");

  tablaPrecios.forEach(function(fila) {

    var claseBadge = "badge-estandar";
    if (fila.tipo === "Premium")   claseBadge = "badge-premium";
    if (fila.tipo === "Económico") claseBadge = "badge-economico";

    var tr = document.createElement("tr");

    tr.innerHTML =
      '<td><strong>' + fila.corte + '</strong></td>' +
      '<td class="precio">' + formatearPrecio(fila.p1)  + '</td>' +
      '<td class="precio">' + formatearPrecio(fila.p5)  + '</td>' +
      '<td class="precio">' + formatearPrecio(fila.p10) + '</td>' +
      '<td class="precio">' + formatearPrecio(fila.p25) + '</td>' +
      '<td><span class="badge ' + claseBadge + '">' + fila.tipo + '</span></td>';

    tbody.appendChild(tr);
  });
}


// ====================================================
// 15. NOTIFICACION FLOTANTE
// ====================================================

function mostrarNotificacion(texto) {
  var noti = document.getElementById("notificacion");
  noti.textContent = texto;
  noti.classList.add("visible");

  setTimeout(function() {
    noti.classList.remove("visible");
  }, 2500);
}


// ====================================================
// 16. FORMATEAR PRECIOS EN PESOS COLOMBIANOS
// ====================================================

function formatearPrecio(numero) {
  return "$" + Math.round(numero).toLocaleString("es-CO");
}


// ====================================================
// INICIO - Al cargar la página
// ====================================================

document.addEventListener("DOMContentLoaded", function() {
  crearTarjetasProductos();
  crearTablaPrecios();
  dibujarCarrito();
});
