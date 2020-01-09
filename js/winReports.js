
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
    //Name
    var spn = document.createElement("SPAN");   
    spn.innerHTML = "<input type='checkbox' id='chkReports_Name' value='Name'><label class='lbl'>Name</label>";
    document.getElementById('divReportsCol3').appendChild(spn);   
    var spn = document.createElement("SPAN");   
    spn.innerHTML = "<input type='text' id='txtReports_NameFrom' class='clsReportsTxt'> ";
    document.getElementById('divReportsCol3').appendChild(spn);   
    var spn = document.createElement("SPAN");   
    spn.innerHTML = "<input type='text' id='txtReports_NameTo' class='clsReportsTxt'>";
    document.getElementById('divReportsCol3').appendChild(spn);   
    //Current Installment
    var spn = document.createElement("SPAN");   
    spn.innerHTML = "<input type='checkbox' id='chkReports_CurInst' value='Name'><label class='lbl'>Current Inst</label>";
    document.getElementById('divReportsCol3').appendChild(spn);   
    var spn = document.createElement("SPAN");   
    spn.innerHTML = "<input type='text' id='txtReports_CurInstFrom' class='clsReportsTxt'>";
    document.getElementById('divReportsCol3').appendChild(spn);   
    var spn = document.createElement("SPAN");   
    spn.innerHTML = "<input type='text' id='txtReports_CurInstTo' class='clsReportsTxt'>";
    document.getElementById('divReportsCol3').appendChild(spn); 
    //Auction Date
    var spn = document.createElement("SPAN");   
    spn.innerHTML = "<input type='checkbox' id='chkReports_AuctDate' value='Name'><label class='lbl'>Auction Date</label>";
    document.getElementById('divReportsCol3').appendChild(spn);   
    var spn = document.createElement("SPAN");   
    spn.innerHTML = "<input type='text' id='txtReports_AuctDateFrom' class='clsReportsTxt'>";
    document.getElementById('divReportsCol3').appendChild(spn);   
    var spn = document.createElement("SPAN");   
    spn.innerHTML = "<input type='text' id='txtReports_AuctDateTo' class='clsReportsTxt'>";
    document.getElementById('divReportsCol3').appendChild(spn);   
    //Starting Date
    var spn = document.createElement("SPAN");   
    spn.innerHTML = "<input type='checkbox' id='chkReports_StartDate' value='Name'><label class='lbl'>Starting Date</label>";
    document.getElementById('divReportsCol3').appendChild(spn);   
    var spn = document.createElement("SPAN");   
    spn.innerHTML = "<input type='text' id='txtReports_StartDateFrom' class='clsReportsTxt'>";
    document.getElementById('divReportsCol3').appendChild(spn);   
    var spn = document.createElement("SPAN");   
    spn.innerHTML = "<input type='text' id='txtReports_StartDateTo' class='clsReportsTxt'>";
    document.getElementById('divReportsCol3').appendChild(spn);   
    //Termination
    var spn = document.createElement("SPAN");   
    spn.innerHTML = "<input type='checkbox' id='chkReports_Termination' value='Name'><label class='lbl'>Termination</label>";
    document.getElementById('divReportsCol3').appendChild(spn);   
    var spn = document.createElement("SPAN");   
    spn.innerHTML = "<input type='text' id='txtReports_TerminationFrom' class='clsReportsTxt'>";
    document.getElementById('divReportsCol3').appendChild(spn);   
    var spn = document.createElement("SPAN");   
    spn.innerHTML = "<input type='text' id='txtReports_TerminationTo' class='clsReportsTxt'>";
    document.getElementById('divReportsCol3').appendChild(spn);   
    //Amount
    var spn = document.createElement("SPAN");   
    spn.innerHTML = "<input type='checkbox' id='chkReports_Amount' value='Name'><label class='lbl'>Amount</label>";
    document.getElementById('divReportsCol3').appendChild(spn);   
    var spn = document.createElement("SPAN");   
    spn.innerHTML = "<input type='text' id='txtReports_AmountFrom' class='clsReportsTxt'>";
    document.getElementById('divReportsCol3').appendChild(spn);   
    var spn = document.createElement("SPAN");   
    spn.innerHTML = "<input type='text' id='txtReports_AmountTo' class='clsReportsTxt'>";
    document.getElementById('divReportsCol3').appendChild(spn);   
    //Running
    var spn = document.createElement("SPAN");   
    spn.innerHTML = "<input type='checkbox' id='chkReports_Running' value='Name'><label class='lbl'>Running</label>";
    document.getElementById('divReportsCol3').appendChild(spn); 
    var spn = document.createElement("SPAN");    
    document.getElementById('divReportsCol3').appendChild(spn); 
    var spn = document.createElement("SPAN"); 
    document.getElementById('divReportsCol3').appendChild(spn); 
    //All
    var spn = document.createElement("SPAN");   
    spn.innerHTML = "<input type='checkbox' id='chkReports_All' value='Name'><label class='lbl'>All</label>";
    document.getElementById('divReportsCol3').appendChild(spn);   
    var spn = document.createElement("SPAN");    
    document.getElementById('divReportsCol3').appendChild(spn); 
    var spn = document.createElement("SPAN"); 
    document.getElementById('divReportsCol3').appendChild(spn); 
    //None
    var spn = document.createElement("SPAN");   
    spn.innerHTML = "<input type='checkbox' id='chkReports_Amount' value='Name'><label class='lbl'>None</label>";
    document.getElementById('divReportsCol3').appendChild(spn);   
    var spn = document.createElement("SPAN");    
    document.getElementById('divReportsCol3').appendChild(spn); 
    var spn = document.createElement("SPAN"); 
    document.getElementById('divReportsCol3').appendChild(spn); 
    //Invert
    var spn = document.createElement("SPAN");   
    spn.innerHTML = "<input type='checkbox' id='chkReports_Amount' value='Name'><label class='lbl'>Invert</label>";
    document.getElementById('divReportsCol3').appendChild(spn);  
    
    var spn = document.createElement("SPAN");   
    spn.innerHTML = "<label class='lbl'>From</label>";
    document.getElementById('divReportsRow2').appendChild(spn);   
    var spn = document.createElement("SPAN");   
    spn.innerHTML = "<input type='text' id='txtReports_MainFrom' class='txt'></br>";
    document.getElementById('divReportsRow2').appendChild(spn);   

    var spn = document.createElement("SPAN");   
    spn.innerHTML = "<label class='lbl'>To (As On)</label>";
    document.getElementById('divReportsRow2').appendChild(spn);   
    var spn = document.createElement("SPAN");   
    spn.innerHTML = "<input type='text' id='txtReports_MainTo' class='txt'></br>";
    document.getElementById('divReportsRow2').appendChild(spn);   
    //Preview Button
    var btn = document.createElement("BUTTON");  
    btn.innerHTML = "Preview";    
    btn.className = "btn"               
    document.getElementById('divReportsRow3').appendChild(btn);
    //Print Button
    var btn = document.createElement("BUTTON");  
    btn.innerHTML = "Print";    
    btn.className = "btn"               
    document.getElementById('divReportsRow3').appendChild(btn);
    //Quit Button
    var btn = document.createElement("BUTTON");  
    btn.innerHTML = "Quit";    
    btn.className = "btn"               
    document.getElementById('divReportsRow3').appendChild(btn);
    //Help Button
    var btn = document.createElement("BUTTON");  
    btn.innerHTML = "Help";    
    btn.className = "btn"               
    document.getElementById('divReportsRow3').appendChild(btn);

};

