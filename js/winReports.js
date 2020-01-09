
function LoadReportControls(){
    var arrReports = [
        ["001","Receipt List"],
        ["002","Group Statement"],
        ["003","Subscriber Addresses"],
        ["004","Ledger Index"],
        ["005","Subscriber Labels(3 Across)"],
        ["006","Customer Labels(3 Across)"],
        ["007","Group Summary"],
        ["008","Daybook"],
        ["009","Outstanding Report"],
        ["010","Collection Details"],
        ["011","Default Intimation"],
        ["012","Group Default"],
        ["013","Auction Subscribers(Order by Time)"],
        ["014","Auction Subscribers(Order by Group)"],
        ["015","Daily Collection Statement"],
        ["016","CA Status"],
        ["017","Intimation"],
        ["018","Installment Report"],
        ["019","Thanks Letter(Second Installment)"],
        ["020","Dues Aging Report without family"],
        ["021","Subscriber's Book"],
        ["022","Group List(PSO & Agree No and Date"],
        ["023","Payment List"],
        ["024","Monthly Prize Paid"],
        ["025","Monthly Prize Paid"],
        ["026","Cash Ledger"],
        ["027","Pending Prize Payments"],
        ["028","Future Liability"],
        ["029","MD Ready Reckoner"],
        ["030","Web Page Dues"],
        ["031","Trial Balance"],
        ["032","DC Daily Summary"],
        ["033","Passbook"],
        ["034","Passbook Cover"],
        ["035","Passbook Ledger Title"],
        ["036","Payment List - Ticketwise"],
        ["037","Foreman Dividend for the period"],
        ["038","Form 1"],
        ["039","Service Tax Statement"],
        ["040","Intimation SMS"],
        ["041","Collection Details in Tabulation"],
        ["042","Intimation Mail"],
        ["043","Collection Details"]];     

    var sel = document.getElementById('lstReport_Reports');
    for(var i = 0; i < arrReports.length; i++) {
        var opt = document.createElement('option');
        opt.text = arrReports[i][1];
        opt.value = arrReports[i][0];
        sel.appendChild(opt);
    }

    var arrGroups = [
        ["G001","G001"],
        ["G002","G002"],
        ["G003","G003"],
        ["G004","G004"],
        ["G005","G005"],
        ["G006","G006"],
        ["G007","G007"],
        ["G008","G008"],
        ["G009","G009"],
        ["G010","G010"],
        ["G011","G011"]];     

    var sel = document.getElementById('lstReport_Groups');
    for(var i = 0; i < arrGroups.length; i++) {
        var opt = document.createElement('option');
        opt.text = arrGroups[i][1];
        opt.value = arrGroups[i][0];
        sel.appendChild(opt);
    }

    var lbl = document.createElement("LABEL");   
    lbl.innerHTML = "Filter";
    lbl.className = "lbl"
    document.getElementById('divReportsCol3').appendChild(lbl);   

    var lbl = document.createElement("LABEL");   
    lbl.innerHTML = "From";
    lbl.className = "lbl"
    document.getElementById('divReportsCol3').appendChild(lbl);   

    var lbl = document.createElement("LABEL");   
    lbl.innerHTML = "To";
    lbl.className = "lbl"
    document.getElementById('divReportsCol3').appendChild(lbl);   


};