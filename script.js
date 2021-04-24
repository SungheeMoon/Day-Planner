$(document).ready(function () {

    //show time
    $("#currentDay").text(moment().format("dddd, MMMM Do"));

    //show color
    const currentTime = moment().hour();
    const arrTimeBlock = $(".time-block");

    $.each(arrTimeBlock, function (index, timeBlock) {
        const dataId = $(timeBlock).attr("data");

        if (currentTime < dataId) {
            $(timeBlock).addClass("past");
        } else if (currentTime == dataId) {
            $(timeBlock).addClass("present");
        } else if (currentTime > dataId) {
            $(timeBlock).addClass("future");
        }
    })

    //save button hamsu
    $(".saveBtn").on("click", function (event) {
        //data id
        const id = $(event.target).closest(".time-block").attr("data");
        //text get
        const text = $(event.target).closest(".time-block").find(".description").val();
        //local data get
        const data = JSON.parse(localStorage.getItem("data")) || [];
        //local data entry
        const dataInput = {
            id: id,
            text: text
        }
        //local data update
        data.push(dataInput);
        //local overwrite
        localStorage.setItem("data", JSON.stringify(data));
    });

    const data = JSON.parse(localStorage.getItem("data")) || [];
    $.each(data, function (index, datum) {
        const name = "[data='" + datum.id + "']";
        $(name).find(".description").val(datum.text);
    });
});