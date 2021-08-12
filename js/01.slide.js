/*************** global init **************/
var $wrapper = $('.wrapper1');
var $slide = $wrapper.find('.slide-wrap');
var $pager = $wrapper.find('.pager');
var $btPrev = $wrapper.find('.bt-prev');
var $btNext = $wrapper.find('.bt-next');
var interval;       // setInterval을 넣어놓을 변수
var idx = 0;        // animation이 움직일 값의 인자 0, -100%, -200%........
var gap = 2000;     // setInterval의 간격
var speed = 500;    // animation speed
var last = $slide.find('.slide').length - 1;    // $('.slide')의 마지막 index

/************** user function *************/
function ani() {
    $slide.stop().animate({ 'left': -(idx * 100)+'%' }, speed);
    $pager.removeClass('active');
    $pager.eq(idx === last ? 0 : idx).addClass('active');
}

/************** event callback ************/
function onEnter() {
    clearInterval(interval);
}

function onLeave() {
    interval = setInterval(onNext, gap);
}

function onPager() {
    idx = $(this).index();
    ani();
}

function onPrev() {
    //idx = (idx === 0) ? last -1 : idx - 1;
    if( idx === 0 ) { // 0번째 사진에서 btPrev를 클릭하면 'left'에서 - last(6*100+'%')로 이동해라. 아니면 idx= last-idx
        $slide.css('left', - last * 100+'%');
        idx = last;
    }
    idx--;
    ani();
}

function onNext() {
    if(idx === last){ // idx가 마지막 사진(6번째)에 있으면. ('left',0) $slide의 첫번째 사진으로 가라. 아니면 idx= idx+0
        $slide.css('left', 0);
        idx = 0;
    }
    idx++;
    ani();
}

/*************** event init ***************/
$wrapper.mouseenter(onEnter).mouseleave(onLeave);
$pager.click(onPager);
$btPrev.click(onPrev);
$btNext.click(onNext);

/*************** start init ***************/
interval = setInterval(onNext, gap);

