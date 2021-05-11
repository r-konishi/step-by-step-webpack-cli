const page1Function = () => {
    const div: HTMLDivElement = <HTMLDivElement>(
        document.getElementById('page1_div')
    );

    div.innerHTML = 'Hellow Page1 Script!!!';
};

window.addEventListener('load', page1Function);
