const main = new Main(new User(), new Project());
main.getSeqfrom();
const btninput = document.getElementById('getval')
const Loadinput = (e) => {
    main.loadinput()
    write_py_node(main)
    launch_test_py_node()
}
btninput.addEventListener('click', Loadinput,false)
