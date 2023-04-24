let chefooter = `
    <div class="d-flex align-items-center justify-content-center test-center align-self-center shadow">
        <h3>Proyecto Integrador Argentina Programa - "Yo Programo2" - Portfolio</h3>
        <h3>FrontEnd hecho en Angular, Firebase, TypeSript. BackEnd en SpringBoot</h3>
        <h3>2023 &c; Hernán Enrique Canestraro.</h3>
    </div>
`

var cheP = [];

function cheCreateHtml(array) {
    fff=array;
    document.open();
    document.write(fff);
    document.close();
}