const main = new Main(new User(), new Project());
main.getSeqfrom();
const btninput = document.getElementById('getval')
const Loadinput = (e) => {
    main.loadinput()
}
btninput.addEventListener('click', Loadinput,false)
