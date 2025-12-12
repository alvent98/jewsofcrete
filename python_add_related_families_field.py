from json import load, loads, dumps

with open('C:\\Users\\a\\Downloads\\joc-test.aigeo.eu\\getPersonsEL_old.json', 'r', encoding="utf8") as file:
    persons_el = load(file)
    file.close

with open('C:\\Users\\a\\Downloads\\joc-test.aigeo.eu\\getPersonsEN_old.json', 'r', encoding="utf8") as file:
    persons_en = load(file)
    file.close

new_buildings_1 = {"type": "FeatureCollection","features": []}
new_personsEN = {"type": "FeatureCollection","features": []}
new_personsEL = {"type": "FeatureCollection","features": []}

persons_features = persons_el["features"]
for person in persons_features:
    person.pop("period3residence")
    lastname = person["lastnames"][0]
    families = []

    # if len(person["lastnames"]) > 1:
    #     print("Person with multiple lastnames: " + person["id"] + ": " + str(person["lastnames"]))
    if " " in lastname:
        lastname = lastname.replace("Αβιγαδέ ", "Αβιγαδές ")
        lastname = lastname.replace("Γανή ", "Γανής ")
    last_letter = lastname[-1]
    if last_letter != "ς" and last_letter in "αεηιουωάέήίόύώ":
        if last_letter in "υύ":
            lastname = lastname[:-1]
        lastname += "ς"

    if person["id"] in ["P0006","P0007","P0524","P0525"]:
        lastname = "Άγγελ"
    if person["id"] in ["P0264","P0265","P0266"]:
        lastname = "Κοέν7"
    if lastname == "Κούνιος":
        lastname = "Διέντες"
    if lastname == "Χανέν":
        lastname = "Άγγελ"
    if person["id"] in ["P0051","P0052","P0059","P0060"] or "[" in lastname:
        lastname = "Βεντούρας"   
    if lastname == "Ταράντος":
        lastname = "Εβλαγόν"
    if lastname == "Ελχάις":
        lastname = "Ελχάις1"
    if lastname == "Ισχακής":
        if person["id"] in ["P0218","P0219","P0220","P0221","P0222"]:
            lastname = "Ισχακής1"
        else:
            lastname = "Ισχακής2"
    if person["id"] in ["P0255","P0256","P0257","P0258","P0259","P0260","P0261","P0262","P0263"]:
        lastname = "Κοέν1"
    if person["id"] in ["P0232","P0233","P0234"]:
        lastname = "Κοέν3"
    if person["id"] in ["P0224","P0225","P0226","P0227","P0228","P0229","P0230","P0231"]:
        lastname = "Κοέν4"
    if person["id"] in ["P0235","P0236","P0237","P0238","P0239","P0240","P0241","P0242","P0243","P0244","P0245","P0246","P0247","P0248","P0249","P0250"]:
        lastname = "Κοέν5"
    if person["id"] in ["P0251","P0252","P0253","P0254"]:
        lastname = "Κοέν6"
    if person["id"] in ["P0264","P0265","P0266","P0267"]:
        lastname = "Κοέν7"
    if lastname == "Βεντούρης":
        lastname = "Κονέν"
    if person["id"] in ["P0055","P0056"]:
        lastname = "Κωνσταντίνης"
    if person["id"] in ["P0311","P0312","P0313"]:	
        lastname = "Λεβής1"
    if person["id"] in ["P0286","P0287","P0288","P0289","P0290"]:	
        lastname = "Λεβής2"
    if person["id"] in ["P0291","P0292","P0293","P0294","P0295","P0296","P0297","P0298","P0299","P0300","P0301","P0302","P0303","P0304","P0305","P0306","P0307","P0308","P0309","P0310"]:	
        lastname = "Λεβής3"
    if lastname == "Μινέρβος" or lastname == "Άλμπερτ" or lastname == "Καπόν"  or lastname == "Σερένας"  or lastname == "Σερένος" or person["id"] in ["P0334","P0335"]:
        lastname = "Μινέρβος1"
    if lastname == "Μόρδος":
        lastname = "Μόρδος1"    
    if lastname == "Όσμος":
        lastname = "Όσμος1"
    if person["id"] in ["P0421","P0422","P0423","P0424","P0425","P0426","P0427"]:
        lastname = "Σαλφατής Δαβίδ 1"
    if person["id"] in ["P0428","P0429","P0430","P0431","P0432"]:
        lastname = "Σαλφατής Δαβίδ 2"
    if person["id"] in ["P0461","P0462","P0463"]:
        lastname = "Φόρτης1"
    if person["id"] in ["P0464","P0465"]:
        lastname = "Φόρτης2"
    if person["id"] in ["P0466","P0467"]:
        lastname = "Φόρτης3"
    if person["id"] in ["P0472","P0473","P0474"]:
        lastname = "Φράγκος3"
    if person["id"] in ["P0475","P0476"]:
        lastname = "Φράγκος5"
    if person["id"] in ["P0468","P0469","P0470","P0471"]:
        lastname = "Φράγκος8"
 
    families.append(lastname)

    # Second Families:
    if lastname == "Αβιγαδές ή Αβιγαδώρ":
        families.append("Κονέν")    
    if person["id"] in ["P0299","P0300","P0301","P0302","P0303","P0304","P0305","P0306"]:
        families.append("Αβιγαδές ή Αβιγαδώρ")
    if person["id"] in ["P0010","P0011","P0012","P0013","P0014"]:
        families.append("Κοέν5")
    if person["id"] in ["P0264","P0265","P0266","P0110","P0111","P0112","P0113","P0114","P0166","P0167","P0168","P0169","P0170"]:
        families.append("Αμάρ")
    if lastname == 'Δεπάς' and person["id"] not in ["P0086","P0085"]:
        families.append("Αμάρ")
    if person["id"] in ["P0166","P0167","P0168","P0169","P0170"]:
        families.append("Δεπάς")
    if person["id"] in ["P0421","P0422","P0423","P0424","P0425","P0426","P0427","P0488","P0489","P0490","P0491","P0492","P0493","P0494","P0495"]:
        families.append("Ελχάις1")
    if person["id"] in ["P0031","P0032","P0033","P0034","P0035","P0142","P0143","P0144","P0145","P0151","P0152","P0153","P0154","P0155","P0156","P0157","P0162","P0163","P0164","P0165","P0286","P0287","P0288","P0289","P0290","P0454","P0455"]:
        families.append("Ισχακής2")
    if person["id"] in ["P0017","P0019","P0293","P0294","P0295","P0296","P0297","P0298","P0390","P0391","P0480","P0481","P0482","P0483","P0484","P0485","P0486","P0487"]:
        families.append("Κοέν1")
    if person["id"] in ["P0151","P0152","P0160","P0161","P0162","P0163","P0164","P0165","P0166","P0167","P0168","P0169","P0170","P0171","P0172","P0173","P0186","P0187","P0188","P0189","P0190","P0191","P0192","P0193","P0194","P0195","P0488","P0489","P0490","P0491","P0492","P0493","P0494","P0495"]:
        families.append("Κοέν2")
    if person["id"] in ["P0181","P0182","P0183","P0184","P0299","P0301","P0302","P0303","P0304","P0305","P0306","P0413","P0414","P0417","P0418","P0419","P0466","P0467"]:
        families.append("Κονέν")
    if person["id"] in ["P0053","P0054","P0057"]:
        families.append("Κωνσταντίνης")
    if person["id"] in ["P0218","P0219","P0220","P0221","P0222","P0228","P0229","P0230"]:
        families.append("Λεβής3")
    if person["id"] in ["P0148","P0149","P0150"]:
        families.append("Λεβής4")
    if person["id"] in ["P0355","P0356","P0357"]:
        families.append("Μινέρβος2")
    if person["id"] in ["P0464","P0465"]:
        families.append("Μινέρβος3")
    if person["id"] in ["P0242","P0243","P0244","P0245","P0246","P0247"]:
        families.append("Μηνιωνής")
    if person["id"] in ["P0237","P0238","P0239","P0240","P0241"]:
        families.append("Μόλχος")
    if person["id"] in ["P0445","P0446","P0447","P0448","P0449","P0450","P0451","P0452","P0453"]:
        families.append("Μόρδος2")
    if person["id"] in ["P0378","P0379","P0448","P0449"]:
        families.append("Μπέτσικας")
    if person["id"] in ["P0400","P0401","P0402","P0403","P0404"]:
        families.append("Όσμος2")   
    if person["id"] in ["P0251","P0252","P0253","P0254","P0268","P0269","P0270","P0271","P0272","P0273","P0274","P0275","P0276"]:
        families.append("Παπουσάδος")
    if person["id"] in ["P0235","P0236","P0237","P0238","P0239","P0240","P0241","P0242","P0243","P0244","P0245","P0246","P0247","P0248","P0249","P0250"]:
        families.append("Πίνχας")  
    if person["id"] in ["P0415"]: 
        families.append("Πολίτης") 
    if person["id"] in ["P0209","P0210","P0211","P0212","P0213","P0475","P0476"]:
        families.append("Σεζάνας") 
    if person["id"] in ["P0115","P0116","P0117","P0118"]:
        families.append("Τρέβεζας")
    if person["id"] in ["P0413","P0414","P0415","P0416","P0417","P0418","P0419"]:
        families.append("Φόρτης3")
    if lastname == 'Δαλμέδικος':
        families.append("Φράγκος1")
    if lastname == 'Αττίας':
        families.append("Φράγκος2")
    if person["id"] in ["P0439","P0440"]:
        families.append("Φράγκος5")
    if lastname == 'Φερμών':
        families.append("Φράγκος6")
    if person["id"] in ["P0154","P0155","P0156","P0157","P0176","P0177","P0178","P0179"]:
        families.append("Χασκέλ")

    person["relatedFamilies"] = families

new_personsEL["features"] = persons_features

with open("getPersonsEL.json", "w", encoding="utf8") as f:
    f.write(dumps(new_personsEL, indent=4, ensure_ascii=False))

persons_features = persons_en["features"]
for person in persons_features:
    person.pop("period3residence")
    lastname = person["lastnames"][0]
    families = []

    # if len(person["lastnames"]) > 1:
    #     print("Person with multiple lastnames: " + person["id"] + ": " + str(person["lastnames"]))
    if " " in lastname:
        lastname = lastname.replace("Avigade ", "Avigades ")
    last_letter = lastname[-1]
    if last_letter != "s" and last_letter in "aeiou":
        if last_letter in "u":
            lastname = lastname[:-1]
        lastname += "s"

    if person["id"] in ["P0006","P0007","P0524","P0525"]:
        lastname = "Αngel"
    if person["id"] in ["P0264","P0265","P0266"]:
        lastname = "Koen7"
    if lastname == "Kounios":
        lastname = "Dientes"    
    if lastname == "Hanen":
        lastname = "Angel"    
    if person["id"] in ["P0051","P0052","P0059","P0060"] or "[" in lastname:
        lastname = "Ventouras"
    if lastname == "Tarantos":
        lastname = "Evlagon"
    if lastname == "Elhais":
        lastname = "Elhais1"
    if lastname == "Ishakis":
        if person["id"] in ["P0218","P0219","P0220","P0221","P0222"]:
            lastname = "Ishakis1"
        else:
            lastname = "Ishakis2"
    if person["id"] in ["P0255","P0256","P0257","P0258","P0259","P0260","P0261","P0262","P0263"]:
        lastname = "Koen1"
    if person["id"] in ["P0232","P0233","P0234"]:
        lastname = "Koen3"
    if person["id"] in ["P0224","P0225","P0226","P0227","P0228","P0229","P0230","P0231"]:
        lastname = "Koen4"
    if person["id"] in ["P0235","P0236","P0237","P0238","P0239","P0240","P0241","P0242","P0243","P0244","P0245","P0246","P0247","P0248","P0249","P0250"]:
        lastname = "Koen5"
    if person["id"] in ["P0251","P0252","P0253","P0254"]:
        lastname = "Koen6"
    if person["id"] in ["P0264","P0265","P0266","P0267"]:
        lastname = "Koen7"
    if lastname == "Ventouris":
        lastname = "Konen"
    if person["id"] in ["P0055","P0056"]:
        lastname = "Konstantinis"
    if person["id"] in ["P0311","P0312","P0313"]:	
        lastname = "Levis1"
    if person["id"] in ["P0286","P0287","P0288","P0289","P0290"]:	
        lastname = "Levis2"
    if person["id"] in ["P0291","P0292","P0293","P0294","P0295","P0296","P0297","P0298","P0299","P0300","P0301","P0302","P0303","P0304","P0305","P0306","P0307","P0308","P0309","P0310"]:	
        lastname = "Levis3"
    if lastname == "Minervos" or lastname == "Albert" or lastname == "Kapon"  or lastname == "Serenas"  or lastname == "Serenos" or person["id"] in ["P0334","P0335"]:
        lastname = "Minervos1"
    if lastname == "Mordos":
        lastname = "Mordos1"
    if lastname == "Osmos":
        lastname = "Osmos1" 
    if person["id"] in ["P0421","P0422","P0423","P0424","P0425","P0426","P0427"]:
        lastname = "Salfatis David 1"
    if person["id"] in ["P0428","P0429","P0430","P0431","P0432"]:
        lastname = "Salfatis David 2"
    if person["id"] in ["P0461","P0462","P0463"]:
        lastname = "Fortis1"
    if person["id"] in ["P0464","P0465"]:
        lastname = "Fortis2"
    if person["id"] in ["P0466","P0467"]:
        lastname = "Fortis3"
    if person["id"] in ["P0472","P0473","P0474"]:
        lastname = "Frangos3"
    if person["id"] in ["P0475","P0476"]:
        lastname = "Frangos5"
    if person["id"] in ["P0468","P0469","P0470","P0471"]:
        lastname = "Frangos8"
            
    families.append(lastname)

    # Second Families:
    if lastname == "Avigades Or Avigador":  
        families.append("Konen")
    if person["id"] in ["P0299","P0300","P0301","P0302","P0303","P0304","P0305","P0306"]:
        families.append("Avigades Or Avigador")
    if person["id"] in ["P0010","P0011","P0012","P0013","P0014"]:
        families.append("Koen5")
    if person["id"] in ["P0264","P0265","P0266","P0110","P0111","P0112","P0113","P0114","P0166","P0167","P0168","P0169","P0170"]:
        families.append("Amar")
    if lastname == 'Depas' and person["id"] not in ["P0086","P0085"]:
        families.append("Amar")
    if person["id"] in ["P0166","P0167","P0168","P0169","P0170"]:
        families.append("Depas")
    if person["id"] in ["P0421","P0422","P0423","P0424","P0425","P0426","P0427","P0488","P0489","P0490","P0491","P0492","P0493","P0494","P0495"]:
        families.append("Elhais1")
    if person["id"] in ["P0031","P0032","P0033","P0034","P0035","P0142","P0143","P0144","P0145","P0151","P0152","P0153","P0154","P0155","P0156","P0157","P0162","P0163","P0164","P0165","P0286","P0287","P0288","P0289","P0290","P0454","P0455"]:
        families.append("Ishakis2")
    if person["id"] in ["P0017","P0019","P0293","P0294","P0295","P0296","P0297","P0298","P0390","P0391","P0480","P0481","P0482","P0483","P0484","P0485","P0486","P0487"]:
        families.append("Koen1")
    if person["id"] in ["P0151","P0152","P0160","P0161","P0162","P0163","P0164","P0165","P0166","P0167","P0168","P0169","P0170","P0171","P0172","P0173","P0186","P0187","P0188","P0189","P0190","P0191","P0192","P0193","P0194","P0195","P0488","P0489","P0490","P0491","P0492","P0493","P0494","P0495"]:
        families.append("Koen2")
    if person["id"] in ["P0181","P0182","P0183","P0184","P0299","P0301","P0302","P0303","P0304","P0305","P0306","P0413","P0414","P0415","P0416","P0417","P0418","P0419","P0466","P0467"]:
        families.append("Konen")
    if person["id"] in ["P0053","P0054","P0057"]:
        families.append("Konstantinis")
    if person["id"] in ["P0218","P0219","P0220","P0221","P0222","P0228","P0229","P0230"]:
        families.append("Levis3")
    if person["id"] in ["P0148","P0149","P0150"]:
        families.append("Levis4")
    if person["id"] in ["P0355","P0356","P0357"]:
        families.append("Minervos2")
    if person["id"] in ["P0464","P0465"]:
        families.append("Minervos3")
    if person["id"] in ["P0242","P0243","P0244","P0245","P0246","P0247"]:
        families.append("Minionis")
    if person["id"] in ["P0237","P0238","P0239","P0240","P0241"]:
        families.append("Molhos")
    if person["id"] in ["P0445","P0446","P0447","P0448","P0449","P0450","P0451","P0452","P0453"]:
        families.append("Mordos2")
    if person["id"] in ["P0378","P0379","P0448","P0449"]:
        families.append("Betsikas")
    if person["id"] in ["P0400","P0401","P0402","P0403","P0404"]:
        families.append("Osmos2")
    if person["id"] in ["P0251","P0252","P0253","P0254","P0268","P0269","P0270","P0271","P0272","P0273","P0274","P0275","P0276"]:
        families.append("Papousados")
    if person["id"] in ["P0235","P0236","P0237","P0238","P0239","P0240","P0241","P0242","P0243","P0244","P0245","P0246","P0247","P0248","P0249","P0250"]:
        families.append("Pinhas")  
    if person["id"] in ["P0415"]: 
        families.append("Politis") 
    if person["id"] in ["P0209","P0210","P0211","P0212","P0213","P0475","P0476"]:
        families.append("Sezanas") 
    if person["id"] in ["P0115","P0116","P0117","P0118"]:
        families.append("Trevezas") 
    if person["id"] in ["P0413","P0414","P0415","P0416","P0417","P0418","P0419"]:
        families.append("Fortis3")
    if lastname == 'Dalmedikos':
        families.append("Frangos1")
    if lastname == 'Attias':
        families.append("Frangos2")
    if person["id"] in ["P0439","P0440"]:
        families.append("Frangos5")
    if lastname == 'Fermon':
        families.append("Frangos6")
    if person["id"] in ["P0154","P0155","P0156","P0157","P0176","P0177","P0178","P0179"]:
        families.append("Haskel")

        
    person["relatedFamilies"] = families

new_personsEN["features"] = persons_features

with open("getPersonsEN.json", "w", encoding="utf8") as f:
    f.write(dumps(new_personsEN, indent=4, ensure_ascii=False))

