/* 
	Copyright 1988-2000 by Autodesk, Inc.

	Permission to use, copy, modify, and distribute this software
	for any purpose and without fee is hereby granted, provided
	that the above copyright notice appears in all copies and
	that both that copyright notice and the limited warranty and
	restricted rights notice below appear in all supporting
	documentation.

	AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
	AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
	MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
	DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
	UNINTERRUPTED OR ERROR FREE.

	Use, duplication, or disclosure by the U.S. Government is subject to
	restrictions set forth in FAR 52.227-19 (Commercial Computer
	Software - Restricted Rights) and DFAR 252.227-7013(c)(1)(ii) 
	(Rights in Technical Data and Computer Software), as applicable.

    Autodesk Publish to Web JavaScript 
    
    Template element id: adsk_ptw_array_of_thumbnails
    Publishing content:  image
                         label
                         description
                         idrop

    Template element id: adsk_ptw_summary_frame
    Publishing content:  drawing summary
*/

adsk_ptw_array_of_thumbnails_main();

function adsk_ptw_array_of_thumbnails_main() {

    var n=4; 
    var table_width="700"; 
    
    var xmle=adsk_ptw_xml.getElementsByTagName("publish_to_web").item(0);
    xmle=xmle.getElementsByTagName("contents").item(0);
    var xmles=xmle.getElementsByTagName("content");
    var e = document.getElementById("adsk_ptw_array_of_thumbnails");
    table = document.createElement("table");
    table.cellSpacing=10; 
    tbody = document.createElement("tbody");
    e.appendChild(table);
    table.appendChild(tbody);
    table.width="100%";
    tbody.appendChild(document.createElement("tr")); 

    var isDWF=false;
    for (i=0; i < xmles.length; i++) {
        if ((0==i) || (0 == (i % n))) { 
            tr = document.createElement("tr");
            tr2 = document.createElement("tr");
            tr3 = document.createElement("tr"); 
            tbody.appendChild(tr);
            tbody.appendChild(tr2);
            tbody.appendChild(document.createElement("tr"));
            tbody.appendChild(document.createElement("tr"));
            tr.align="left";
            tr.vAlign="top"
            tr2.align="left";
            tr2.vAlign="top"
        }  
        td = document.createElement("td"); 
        td2 = document.createElement("td"); 
        tr.appendChild(td);
        tr2.appendChild(td2);  
        td.width=table_width / n; 
        td2.width=table_width / n; 
        td2.align="left";
        td2.vAlign="top";
        content=xmles.item(i);     
        image=content.getElementsByTagName("imagex").item(0);
        a=document.createElement("a"); 
        td.appendChild(a);
        a.value=image.firstChild.data;
        a.href="javascript:adsk_ptw_array_of_thumbnails_onClickImage()";
        thumb=content.getElementsByTagName("thumbnail").item(0);
        img = document.createElement("image");
        a.appendChild(img);
        img.src = thumb.firstChild.data; 
        img.border=1; 
        img.onmouseover=function() { adsk_ptw_array_of_thumbnails_mouse_over(); }
        img.onmouseout=function() { adsk_ptw_array_of_thumbnails_mouse_out(); }
        img.name=i;

        idrop = content.getElementsByTagName("iDropXML").item(0);
        if (null != idrop.firstChild) {
            br = document.createElement("br");
            td.appendChild(br);
            activex = document.createElement("object");
            td.appendChild(activex);
            activex.codeBase=xmsg_adsk_ptw_all_idrop_url;
//Checking appVersion to load appropriate ActiveX control( 32-bit or 64-bit )
            var appVersionName = navigator.appVersion;
            var index = appVersionName.indexOf("x64");
            if(index != -1 )
            {
                activex.classid="clsid:32290CD1-D585-4803-AF20-F16E20FF377A";
            }
            else
            {
                activex.classid="clsid:21E0CB95-1198-4945-A3D2-4BF804295F78";
            }
            
            activex.package=idrop.firstChild.data;
            activex.background="iDropButton.gif";
            activex.width="16";
            activex.height="16";
        }

        a2=document.createElement("a"); 
        td2.appendChild(a2);
        a2.className="DRAWING_LABEL";   
        a2.value=image.firstChild.data;
        a2.href="javascript:adsk_ptw_array_of_thumbnails_onClickImage()";

        if (!isDWF) {
            isDWF=adsk_ptw_validate_viewer_is_dwf_file(image.firstChild.data);
        }

        title=content.getElementsByTagName("title").item(0);
        if (null == title.firstChild) {
            a2.appendChild(document.createTextNode(" "));
        }
        else {
            a2.appendChild(document.createTextNode(title.firstChild.data));
        }
        td2.appendChild(document.createElement("br"));

        div=document.createElement("div");
        td2.appendChild(div);
        div.className="DRAWING_DESCRIPTION";  
        desc = content.getElementsByTagName("description").item(0);
        if (null == desc.firstChild) {
            div.appendChild(document.createTextNode(""));
        }
        else {
            div.appendChild(document.createTextNode(desc.firstChild.data));
        }
    }
    if (isDWF) {
        viewerInstalled = false;
        IE4plus = (document.all) ? true : false;
	    if (IE4plus)
	        // try and catch work fine in IE, but will generate errors in Netscape. So evaluating try and catch block as string and evaluate it usung eval fuction
  	        eval ('try {var xObj = new ActiveXObject("AdView.Adviewer");if (xObj == null) viewerInstalled = false; else viewerInstalled = true; } catch (e) { viewerInstalled = false; }');

	    if (viewerInstalled) {
		    activex = document.createElement("object");
	        activex.classid="clsid:A662DA7E-CCB7-4743-B71A-D817F6D575DF";
	    }
	    else
		    adsk_ptw_onerror(); // Redirects the user to a website where they can download Autodest Express Viewer
    }
}

function adsk_ptw_array_of_thumbnails_onClickImage() {
    parent.window.navigate(document.activeElement.value);
}

function adsk_ptw_array_of_thumbnails_mouse_over() {
    if (null == parent) return;
    if (null == parent.adsk_ptw_summary_frame) return;

    i=window.event.srcElement.name;

    var xmle=adsk_ptw_xml.getElementsByTagName("publish_to_web").item(0);
    xmle=xmle.getElementsByTagName("contents").item(0);
    var xmles=xmle.getElementsByTagName("content");
    sum_info = xmles.item(i).getElementsByTagName("summary_info").item(0);

    if (null != sum_info) {
        body=parent.adsk_ptw_summary_frame.document.getElementsByTagName("body").item(0);

        title=sum_info.getElementsByTagName("title").item(0);
        adsk_ptw_array_of_thumbnails_summary(body, xmsg_adsk_ptw_all_summaryTitle, title);

        subject=sum_info.getElementsByTagName("subject").item(0);
        adsk_ptw_array_of_thumbnails_summary(body, xmsg_adsk_ptw_all_summarySubject, subject);

        author=sum_info.getElementsByTagName("author").item(0);
        adsk_ptw_array_of_thumbnails_summary(body, xmsg_adsk_ptw_all_summaryAuthor, author);

        keywords=sum_info.getElementsByTagName("keywords").item(0);
        adsk_ptw_array_of_thumbnails_summary(body, xmsg_adsk_ptw_all_summaryKeywords, keywords);

        comments=sum_info.getElementsByTagName("comments").item(0);
        adsk_ptw_array_of_thumbnails_summary(body, xmsg_adsk_ptw_all_summaryComments, comments);
        
        hyperlink_base=sum_info.getElementsByTagName("hyperlink_base").item(0);
        adsk_ptw_array_of_thumbnails_summary(body, xmsg_adsk_ptw_all_summaryHyperlinkBase, hyperlink_base);
    }
}

function adsk_ptw_array_of_thumbnails_mouse_out() {
    if (null == parent) return;
    if (null == parent.adsk_ptw_summary_frame) return;

    body=parent.adsk_ptw_summary_frame.document.getElementsByTagName("body").item(0);
    n=body.childNodes.length;
    for (i=0; i < n; i++) {
        body.removeChild(body.firstChild);
    }
}

function adsk_ptw_array_of_thumbnails_summary(rootNode, nameString, valueNode) {
    if (null == valueNode) return;
    if (null == valueNode.firstChild) return;

    b=parent.adsk_ptw_summary_frame.document.createElement("b");
    div=parent.adsk_ptw_summary_frame.document.createElement("div");
    rootNode.appendChild(div);
    div.appendChild(b);
    str = nameString + valueNode.firstChild.data;
    b.appendChild(parent.adsk_ptw_summary_frame.document.createTextNode(str));
}



// SIG // Begin signature block
// SIG // MIIZ4gYJKoZIhvcNAQcCoIIZ0zCCGc8CAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // c3Tz6PixXNhVeU4QLU2oqwI8co5fpy0YGDRwxwoPkv6g
// SIG // ggpSMIIFAzCCA+ugAwIBAgIQdnK0JhTS6n5kEFOlgziE
// SIG // ljANBgkqhkiG9w0BAQsFADCBhDELMAkGA1UEBhMCVVMx
// SIG // HTAbBgNVBAoTFFN5bWFudGVjIENvcnBvcmF0aW9uMR8w
// SIG // HQYDVQQLExZTeW1hbnRlYyBUcnVzdCBOZXR3b3JrMTUw
// SIG // MwYDVQQDEyxTeW1hbnRlYyBDbGFzcyAzIFNIQTI1NiBD
// SIG // b2RlIFNpZ25pbmcgQ0EgLSBHMjAeFw0xNjA4MDgwMDAw
// SIG // MDBaFw0xNzA5MDIyMzU5NTlaMIGIMQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECAwKQ2FsaWZvcm5pYTETMBEGA1UEBwwK
// SIG // U2FuIFJhZmFlbDEWMBQGA1UECgwNQXV0b2Rlc2ssIElu
// SIG // YzEfMB0GA1UECwwWRGVzaWduIFNvbHV0aW9ucyBHcm91
// SIG // cDEWMBQGA1UEAwwNQXV0b2Rlc2ssIEluYzCCASIwDQYJ
// SIG // KoZIhvcNAQEBBQADggEPADCCAQoCggEBAOqZ9OjPzARq
// SIG // d9dP4fq2qXdpTJolFYJ8Wxg8WcZVciX3l+dljew4R9C8
// SIG // WR/0tW17lLANaSORF4IYmWTgdpFg5PGR3s+R4A461hpR
// SIG // IG9QthGUq8Bt7af5VbCjjKtYBNq/x3ukqVsw/1/qljGV
// SIG // plDOyr976ktnCm0/wL0N+ubk5WAIgv+I9E0i6+GX1hRm
// SIG // +eRliYKeKF0/gBLyDh3ut+N3HNPrnfjfec7q2Czd82Ce
// SIG // RBCToR1E7Cp6yBBdGUfb3JE0PnE1+6n0qJnsvs2bsCIz
// SIG // qVo3A0iMHBsbioxa5DYyXuEfNCktosUlFXfegd514ZJn
// SIG // s6YDr4PlahC0+lK3hgJy5vkCAwEAAaOCAWkwggFlMAkG
// SIG // A1UdEwQCMAAwDgYDVR0PAQH/BAQDAgeAMBMGA1UdJQQM
// SIG // MAoGCCsGAQUFBwMDMGEGA1UdIARaMFgwVgYGZ4EMAQQB
// SIG // MEwwIwYIKwYBBQUHAgEWF2h0dHBzOi8vZC5zeW1jYi5j
// SIG // b20vY3BzMCUGCCsGAQUFBwICMBkMF2h0dHBzOi8vZC5z
// SIG // eW1jYi5jb20vcnBhMB8GA1UdIwQYMBaAFNTABiJJ6zlL
// SIG // 3ZPiXKG4R3YJcgNYMCsGA1UdHwQkMCIwIKAeoByGGmh0
// SIG // dHA6Ly9yYi5zeW1jYi5jb20vcmIuY3JsMFcGCCsGAQUF
// SIG // BwEBBEswSTAfBggrBgEFBQcwAYYTaHR0cDovL3JiLnN5
// SIG // bWNkLmNvbTAmBggrBgEFBQcwAoYaaHR0cDovL3JiLnN5
// SIG // bWNiLmNvbS9yYi5jcnQwEQYJYIZIAYb4QgEBBAQDAgQQ
// SIG // MBYGCisGAQQBgjcCARsECDAGAQEAAQH/MA0GCSqGSIb3
// SIG // DQEBCwUAA4IBAQDAO29k596Wq5ympOToYLmaRc7ZeGvY
// SIG // x6j5lNWmwCC9ACLTN+mqXF1msf5KtHRHTpyLFVDH/zCC
// SIG // 3LrRzHSHuflhkKFlhJQsEttZ3rhmKxlEtJ85Id9pA8wm
// SIG // XN+Q5tKIStReWLsZ2eA15G9BEFmPvq5DAFj0h+LNF6hq
// SIG // 87C2bVqim29Kf9wDMp3Ndd7hj07QEVh7CqCKEoAJYvXR
// SIG // BBAdrMTqjCTtYCwDkAaAg5LdEm5w76jCQkR2XzKOTgDl
// SIG // qa9uQIyQBAc2ci6X9OBdGJw0ZM0JDlEkRpr3uODtZIOn
// SIG // UQQchI+k+cwEAK7+vFhfsLBi7Dyt1mbvfINr803cFja3
// SIG // i5JOMIIFRzCCBC+gAwIBAgIQfBs1NUrn23TnQV8Racpr
// SIG // qDANBgkqhkiG9w0BAQsFADCBvTELMAkGA1UEBhMCVVMx
// SIG // FzAVBgNVBAoTDlZlcmlTaWduLCBJbmMuMR8wHQYDVQQL
// SIG // ExZWZXJpU2lnbiBUcnVzdCBOZXR3b3JrMTowOAYDVQQL
// SIG // EzEoYykgMjAwOCBWZXJpU2lnbiwgSW5jLiAtIEZvciBh
// SIG // dXRob3JpemVkIHVzZSBvbmx5MTgwNgYDVQQDEy9WZXJp
// SIG // U2lnbiBVbml2ZXJzYWwgUm9vdCBDZXJ0aWZpY2F0aW9u
// SIG // IEF1dGhvcml0eTAeFw0xNDA3MjIwMDAwMDBaFw0yNDA3
// SIG // MjEyMzU5NTlaMIGEMQswCQYDVQQGEwJVUzEdMBsGA1UE
// SIG // ChMUU3ltYW50ZWMgQ29ycG9yYXRpb24xHzAdBgNVBAsT
// SIG // FlN5bWFudGVjIFRydXN0IE5ldHdvcmsxNTAzBgNVBAMT
// SIG // LFN5bWFudGVjIENsYXNzIDMgU0hBMjU2IENvZGUgU2ln
// SIG // bmluZyBDQSAtIEcyMIIBIjANBgkqhkiG9w0BAQEFAAOC
// SIG // AQ8AMIIBCgKCAQEA15VD1NzfZ645+1KktiYxBHDpt45b
// SIG // Kro3aTWVj7vAMOeG2HO73+vRdj+KVo7rLUvwVxhOsY2l
// SIG // M9MLdSPVankn3aPT9w6HZbXerRzx9TW0IlGvIqHBXUuQ
// SIG // f8BZTqudeakC1x5JsTtNh/7CeKu/71KunK8I2TnlmlE+
// SIG // aV8wEE5xY2xY4fAgMxsPdL5byxLh24zEgJRyu/ZFmp7B
// SIG // JQv7oxye2KYJcHHswEdMj33D3hnOPu4Eco4X0//wsgUy
// SIG // GUzTsByf/qV4IEJwQbAmjG8AyDoAEUF6QbCnipEEoJl4
// SIG // 9He082Aq5mxQBLcUYP8NUfSoi4T+IdpcXn31KXlPsER0
// SIG // b21y/wIDAQABo4IBeDCCAXQwLgYIKwYBBQUHAQEEIjAg
// SIG // MB4GCCsGAQUFBzABhhJodHRwOi8vcy5zeW1jZC5jb20w
// SIG // EgYDVR0TAQH/BAgwBgEB/wIBADBmBgNVHSAEXzBdMFsG
// SIG // C2CGSAGG+EUBBxcDMEwwIwYIKwYBBQUHAgEWF2h0dHBz
// SIG // Oi8vZC5zeW1jYi5jb20vY3BzMCUGCCsGAQUFBwICMBka
// SIG // F2h0dHBzOi8vZC5zeW1jYi5jb20vcnBhMDYGA1UdHwQv
// SIG // MC0wK6ApoCeGJWh0dHA6Ly9zLnN5bWNiLmNvbS91bml2
// SIG // ZXJzYWwtcm9vdC5jcmwwEwYDVR0lBAwwCgYIKwYBBQUH
// SIG // AwMwDgYDVR0PAQH/BAQDAgEGMCkGA1UdEQQiMCCkHjAc
// SIG // MRowGAYDVQQDExFTeW1hbnRlY1BLSS0xLTcyNDAdBgNV
// SIG // HQ4EFgQU1MAGIknrOUvdk+JcobhHdglyA1gwHwYDVR0j
// SIG // BBgwFoAUtnf6aUhHn1MS1cLqBzJ2B9GXBxkwDQYJKoZI
// SIG // hvcNAQELBQADggEBAH/ryqfqi3ZC6z6OIFQw47e53PpI
// SIG // PhbHD0WVEM0nhqNm8wLtcfiqwlWXkXCD+VJ+Umk8yfHg
// SIG // lEaAGLuh1KRWpvMdAJHVhvNIh+DLxDRoIF60y/kF7Zyv
// SIG // cFMnueg+flGgaXGL3FHtgDolMp9Er25DKNMhdbuX2IuL
// SIG // jP6pBEYEhfcVnEsRjcQsF/7Vbn+a4laS8ZazrS359N/a
// SIG // iZnOsjhEwPdHe8olufoqaDObUHLeqJ/UzSwLNL2LMHhA
// SIG // 4I2OJxuQbxq+CBWBXesv4lHnUR7JeCnnHmW/OO8BSgEJ
// SIG // JA4WxBR5wUE3NNA9kVKUneFo7wjw4mmcZ26QCxqTcdQm
// SIG // AsPAWiMxgg7oMIIO5AIBATCBmTCBhDELMAkGA1UEBhMC
// SIG // VVMxHTAbBgNVBAoTFFN5bWFudGVjIENvcnBvcmF0aW9u
// SIG // MR8wHQYDVQQLExZTeW1hbnRlYyBUcnVzdCBOZXR3b3Jr
// SIG // MTUwMwYDVQQDEyxTeW1hbnRlYyBDbGFzcyAzIFNIQTI1
// SIG // NiBDb2RlIFNpZ25pbmcgQ0EgLSBHMgIQdnK0JhTS6n5k
// SIG // EFOlgziEljANBglghkgBZQMEAgEFAKB8MBAGCisGAQQB
// SIG // gjcCAQwxAjAAMBkGCSqGSIb3DQEJAzEMBgorBgEEAYI3
// SIG // AgEEMBwGCisGAQQBgjcCAQsxDjAMBgorBgEEAYI3AgEV
// SIG // MC8GCSqGSIb3DQEJBDEiBCABCi0Cr6pM/ls4FxZMgpk3
// SIG // js5KIMpL1REfuBy48mKTNzANBgkqhkiG9w0BAQEFAASC
// SIG // AQCEOif3l+s+Hru+hZpwvUlhiTw5/xbZscKqBbr6iN75
// SIG // RqcabzI9Pn8SFT9PEqUAtp3OQNh4OuGYjo8EodlllJhl
// SIG // 37jVgv3Qo/CR+wFrau4pMn6JHV8wDKB03Oqp0a0wfO6M
// SIG // eW8GpMgNcFwD8GZITsG6AJLj3/fsj1zY8LZBmLMrwfUj
// SIG // k/TzFKLZYRol2jZgupMgA0zte8oSqvLmZb82Id7GzKU+
// SIG // fOQB5nx8lti2wcajvnwBMMJONg9QV02BExG1cYWMCjRE
// SIG // +hEkLlqGcHC6CCFIrHQ6gCQPzz6FLcM6o/1QjLdnU8T4
// SIG // MyZSsoB6fgthMgjPBxoqVxk+bgkq/I7QVRxjoYIMoTCC
// SIG // DJ0GCisGAQQBgjcDAwExggyNMIIMiQYJKoZIhvcNAQcC
// SIG // oIIMejCCDHYCAQMxDzANBglghkgBZQMEAgEFADCB3QYL
// SIG // KoZIhvcNAQkQAQSggc0EgcowgccCAQEGCSsGAQQBoDIC
// SIG // AzAxMA0GCWCGSAFlAwQCAQUABCAOn1PP2IdDURhaT5eD
// SIG // lPxOihCshHt2O3rAYIqpEDA9iwIUW26WLRaUZZ4ztbux
// SIG // Gcdq5iq8yCQYDzIwMTcwNTIyMDYxNjMxWqBdpFswWTEL
// SIG // MAkGA1UEBhMCU0cxHzAdBgNVBAoTFkdNTyBHbG9iYWxT
// SIG // aWduIFB0ZSBMdGQxKTAnBgNVBAMTIEdsb2JhbFNpZ24g
// SIG // VFNBIGZvciBBZHZhbmNlZCAtIEcyoIIIxjCCBKkwggOR
// SIG // oAMCAQICEhEhBvEPzmjwm/rlWxjNjyABdzANBgkqhkiG
// SIG // 9w0BAQsFADBbMQswCQYDVQQGEwJCRTEZMBcGA1UEChMQ
// SIG // R2xvYmFsU2lnbiBudi1zYTExMC8GA1UEAxMoR2xvYmFs
// SIG // U2lnbiBUaW1lc3RhbXBpbmcgQ0EgLSBTSEEyNTYgLSBH
// SIG // MjAeFw0xNjA1MjQwMDAwMDBaFw0yNzA2MjQwMDAwMDBa
// SIG // MFkxCzAJBgNVBAYTAlNHMR8wHQYDVQQKExZHTU8gR2xv
// SIG // YmFsU2lnbiBQdGUgTHRkMSkwJwYDVQQDEyBHbG9iYWxT
// SIG // aWduIFRTQSBmb3IgQWR2YW5jZWQgLSBHMjCCASIwDQYJ
// SIG // KoZIhvcNAQEBBQADggEPADCCAQoCggEBALfHkooo2POR
// SIG // y1ANXespRMGCWaXKZM69g7VR5ZTMboCaF2zc/2LmNkNe
// SIG // AcIMZI3Kd572XXdFuV7IJOtBNxFmN6zIzXSbzLPvTOJ/
// SIG // G85zvsmWnTUefPdU92zsoBLWrpmdY8R4X1mpLiL1wyfY
// SIG // sltFYyeQ/4yxPam08w7A8SBlBomdAxyjsFJBhTTrvMvO
// SIG // VPYS/rMBiUqm+lTFH/vTHMDjv5fjP9Ab+UDHG9XrJnxD
// SIG // MMdw8ngRqoVOpQ4NAEo6EXejyiMBgJ7Ik1ZdRsyK2NKq
// SIG // CoSFsolb1TLOQXsYTlTKq9FSXhLTJJ5W8wyP3b2SjnnV
// SIG // QYnDo6DlkfzHZ52HM85xMnMCAwEAAaOCAWcwggFjMA4G
// SIG // A1UdDwEB/wQEAwIHgDBMBgNVHSAERTBDMEEGCSsGAQQB
// SIG // oDIBHjA0MDIGCCsGAQUFBwIBFiZodHRwczovL3d3dy5n
// SIG // bG9iYWxzaWduLmNvbS9yZXBvc2l0b3J5LzAJBgNVHRME
// SIG // AjAAMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMIMEYGA1Ud
// SIG // HwQ/MD0wO6A5oDeGNWh0dHA6Ly9jcmwuZ2xvYmFsc2ln
// SIG // bi5jb20vZ3MvZ3N0aW1lc3RhbXBpbmdzaGEyZzIuY3Js
// SIG // MFgGCCsGAQUFBwEBBEwwSjBIBggrBgEFBQcwAoY8aHR0
// SIG // cDovL3NlY3VyZS5nbG9iYWxzaWduLmNvbS9jYWNlcnQv
// SIG // Z3N0aW1lc3RhbXBpbmdzaGEyZzIuY3J0MB0GA1UdDgQW
// SIG // BBQtbm7RjeUDgO7nY+mn2doLPFciPTAfBgNVHSMEGDAW
// SIG // gBSSIadKlV1ksJu0HuYAN0fmnUErTDANBgkqhkiG9w0B
// SIG // AQsFAAOCAQEAV51T5N3upSze5L9igKJhhkqfm50kIzCb
// SIG // jyeHL/oEWc5wiD1GUnfEm0XSj723IRhJ2C6H/5Iud/k/
// SIG // CvmgIVwTT+SEKyiHzFwVuROr4hJVw/hFHkkZzqp1DyHo
// SIG // 71H8NCwLMgUJsuQWaa3ZLn7h/C1IvxrTdDUBOt8wQ3Bn
// SIG // ejjXuhHCVvsxSLpb8SESYuB2iZEfSTjUWE15CYqp2m8C
// SIG // 1q3k2ol9TNmxMHBAattFulN2kNxLQhYhz+TSWJTUVWWb
// SIG // dgOsrhgItoMSjEE+X4BFZMiJ1DMXoaFMvT/Ekv5/hfK+
// SIG // sazX9p7LzhMq7gJDT/z/cDU0ozN8z+INMiQgfAA+ozIR
// SIG // 3jCCBBUwggL9oAMCAQICCwQAAAAAATGJxlAEMA0GCSqG
// SIG // SIb3DQEBCwUAMEwxIDAeBgNVBAsTF0dsb2JhbFNpZ24g
// SIG // Um9vdCBDQSAtIFIzMRMwEQYDVQQKEwpHbG9iYWxTaWdu
// SIG // MRMwEQYDVQQDEwpHbG9iYWxTaWduMB4XDTExMDgwMjEw
// SIG // MDAwMFoXDTI5MDMyOTEwMDAwMFowWzELMAkGA1UEBhMC
// SIG // QkUxGTAXBgNVBAoTEEdsb2JhbFNpZ24gbnYtc2ExMTAv
// SIG // BgNVBAMTKEdsb2JhbFNpZ24gVGltZXN0YW1waW5nIENB
// SIG // IC0gU0hBMjU2IC0gRzIwggEiMA0GCSqGSIb3DQEBAQUA
// SIG // A4IBDwAwggEKAoIBAQCqm47DqxFRJQG2lpTiT9jBCPZG
// SIG // I9lFxZWXW6sav9JsV8kzBh+gD8Y8flNIer+dh56v7sOM
// SIG // R+FC7OPjoUpsDBfEpsG5zVvxHkSJjv4L3iFYE+5NyMVn
// SIG // Cxyys/E0dpGiywdtN8WgRyYCFaSQkal5ntfrV50rfCLY
// SIG // FNfxBx54IjZrd3mvr/l/jk7htQgx/ertS3FijCPxAzmP
// SIG // RHm2dgNXnq0vCEbc0oy89I50zshoaVF2EYsPXSRbGVQ9
// SIG // JsxAjYInG1kgfVn2k4CO+Co4/WugQGUfV3bMW44ETyyo
// SIG // 24RQE0/G3Iu5+N1pTIjrnHswJvx6WLtZvBRykoFXt3bJ
// SIG // 2IAKgG4JAgMBAAGjgegwgeUwDgYDVR0PAQH/BAQDAgEG
// SIG // MBIGA1UdEwEB/wQIMAYBAf8CAQAwHQYDVR0OBBYEFJIh
// SIG // p0qVXWSwm7Qe5gA3R+adQStMMEcGA1UdIARAMD4wPAYE
// SIG // VR0gADA0MDIGCCsGAQUFBwIBFiZodHRwczovL3d3dy5n
// SIG // bG9iYWxzaWduLmNvbS9yZXBvc2l0b3J5LzA2BgNVHR8E
// SIG // LzAtMCugKaAnhiVodHRwOi8vY3JsLmdsb2JhbHNpZ24u
// SIG // bmV0L3Jvb3QtcjMuY3JsMB8GA1UdIwQYMBaAFI/wS3+o
// SIG // LkUkrk1Q+mOai97i3Ru8MA0GCSqGSIb3DQEBCwUAA4IB
// SIG // AQAEVoJKfNDOyb82ZtG+NZ6TbJfoBs4xGFn5bEFfgC7A
// SIG // QiW4GMf81LE3xGigzyhqA3RLY5eFd2E71y/j9b0zopJ9
// SIG // ER+eimzvLLD0Yo02c9EWNvG8Xuy0gJh4/NJ2eejhIZTg
// SIG // H8Si4apn27Occ+VAIs85ztvmd5Wnu7LL9hmGnZ/I1JgF
// SIG // snFvTnWu8T1kajteTkamKl0IkvGj8x10v2INI4xcKjiV
// SIG // 0sDVzc+I2h8otbqBaWQqtaai1XOv3EbbBK6R127FmLrU
// SIG // R8RWdIBHeFiMvu8r/exsv9GU979Q4HvgkP0gGHgYIl0I
// SIG // LowcoJfzHZl9o52R0wZETgRuehwg4zbwtlC5MYICtDCC
// SIG // ArACAQEwcTBbMQswCQYDVQQGEwJCRTEZMBcGA1UEChMQ
// SIG // R2xvYmFsU2lnbiBudi1zYTExMC8GA1UEAxMoR2xvYmFs
// SIG // U2lnbiBUaW1lc3RhbXBpbmcgQ0EgLSBTSEEyNTYgLSBH
// SIG // MgISESEG8Q/OaPCb+uVbGM2PIAF3MA0GCWCGSAFlAwQC
// SIG // AQUAoIIBFDAaBgkqhkiG9w0BCQMxDQYLKoZIhvcNAQkQ
// SIG // AQQwHAYJKoZIhvcNAQkFMQ8XDTE3MDUyMjA2MTYzMVow
// SIG // LwYJKoZIhvcNAQkEMSIEIHIZSkuE3esy6jgIkwylBpcM
// SIG // B6L4owMEEYvJtrpG+SKuMIGmBgsqhkiG9w0BCRACDDGB
// SIG // ljCBkzCBkDCBjQQUfVXY51pWovxzgkP3uFSHXFy1Kg0w
// SIG // dTBfpF0wWzELMAkGA1UEBhMCQkUxGTAXBgNVBAoTEEds
// SIG // b2JhbFNpZ24gbnYtc2ExMTAvBgNVBAMTKEdsb2JhbFNp
// SIG // Z24gVGltZXN0YW1waW5nIENBIC0gU0hBMjU2IC0gRzIC
// SIG // EhEhBvEPzmjwm/rlWxjNjyABdzANBgkqhkiG9w0BAQEF
// SIG // AASCAQBQa/IwxIY0mFwtxT6WWHcG/aWw7HOgX/zgHaNZ
// SIG // YV4JMRUSI/+0taRhBSlT3W6V4tFr0DjWP0TcK8aSGvQQ
// SIG // wortnRMxe+S0dLGV05HHfhCYQYcUSjZ7Rz4FdBYQwQY/
// SIG // oux0a0DqtHJbmylSNT2fHnAozqhDVIRCf/H5lGy4ivWy
// SIG // B6yetGKXzYHvyg7/csFZ5/Lcba+Yl9akYNyUnNeVzyB7
// SIG // 7/OpV23j0ozX6CCqkunMCK3wSDLcG2lBivjfRis/FFQT
// SIG // rtqPM3BjSjbzQEh9CfoaHZjI2h8C7Hv9XSSgf0PB/DvG
// SIG // VSzLoDykolpQuAoUpY/nB6cGQuqvAa61Jcok0HCn
// SIG // End signature block
