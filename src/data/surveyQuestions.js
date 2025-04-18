export const surveyQuestions = {
  fr: [
    {
      id: 1,
      title: "Lutte contre le racisme et inclusion des minorités",
      question: "Selon vous, quelles initiatives ont le plus contribué à lutter contre le racisme et à inclure les minorités ?",
      type: "single",
      options: [
        { value: "projects", text: "Les 1 100 projets sociaux soutenus par Paris 2024" },
        { value: "campaigns", text: "La diversité des athlètes mise en avant dans les campagnes officielles" },
        { value: "education", text: "Les actions éducatives et de sensibilisation dans les écoles et clubs sportifs" },
        { value: "partners", text: "L'engagement des organisations partenaires contre les discriminations" },
        { value: "none", text: "Aucune de ces initiatives" }
      ]
    },
    {
      id: 2,
      title: "Protection de l'enfance et de la jeunesse",
      question: "Des espaces de jeux pour enfants étaient-ils aménagés dans les fan zones et étaient-ils surveillés pour garantir la sécurité ?",
      type: "single",
      options: [
        { value: "safe", text: "Oui, surveillés en toute sécurité" },
        { value: "unsupervised", text: "Oui, mais non surveillés" },
        { value: "partial", text: "Oui mais pas dans toutes les fan zones" },
        { value: "no", text: "Non" },
        { value: "unknown", text: "Ne sait pas" }
      ]
    },
    {
      id: 3,
      title: "Sport féminin",
      question: "Selon vous, quelle initiative a le plus contribué à valoriser la place du sport féminin lors des Jeux Olympiques et Paralympiques de Paris 2024 ?",
      type: "single",
      options: [
        { value: "balanced", text: "Un programme équilibré avec 50 % de femmes parmi les 10 500 athlètes et 28 des 32 sports comportant un même nombre d'épreuves masculines et féminines." },
        { value: "mixed", text: "L'introduction de 20 épreuves mixtes et 152 épreuves exclusivement féminines, permettant aux femmes de participer à plus de la moitié des épreuves avec remise de médailles." },
        { value: "coverage", text: "Une répartition plus équitable du calendrier des compétitions sur 16 jours, offrant une couverture médiatique plus équilibrée entre les genres." },
        { value: "marathon", text: "Le remplacement du marathon masculin par un marathon féminin pour clôturer les Jeux." },
        { value: "delegation", text: "L'encouragement du CIO pour que les Comités Nationaux Olympiques envoient des délégations comprenant au moins une athlète et un athlète, avec un homme et une femme portant ensemble le drapeau de leur pays lors de la cérémonie d'ouverture." }
      ]
    },
    {
      id: 4,
      title: "Sport pour tous",
      question: "Des dispositifs innovants, tels que des tablettes tactiles pour les personnes malvoyantes, ont été introduits pour améliorer l'accessibilité des compétitions. Comment évaluez-vous l'efficacité de ces mesures pour les spectateurs en situation de handicap ?",
      type: "single",
      options: [
        { value: "very_effective", text: "Très efficace" },
        { value: "effective", text: "Efficace" },
        { value: "somewhat_effective", text: "Peu efficace" },
        { value: "not_effective", text: "Pas du tout efficace" },
        { value: "unknown", text: "Ne sait pas" }
      ]
    },
    {
      id: 5,
      title: "Personnes âgées",
      question: "Le programme Paris Sport Seniors a offert des activités sportives gratuites aux Parisiens de plus de 55 ans. Selon vous, cette initiative a-t-elle encouragé la participation des seniors aux activités sportives liées aux Jeux ?",
      type: "single",
      options: [
        { value: "significant", text: "Oui, de manière significative" },
        { value: "somewhat", text: "Oui, dans une certaine mesure" },
        { value: "no", text: "Non, peu ou pas du tout" },
        { value: "unknown", text: "Ne sait pas" }
      ]
    },
    {
      id: 6,
      title: "LGBTQIA+",
      question: "Selon vous, les actions menées par le comité d'organisation et le CIO (comme la Pride House ou la représentation des athlètes LGBTQIA+) ont-elles été suffisantes pour offrir un environnement sûr et inclusif pour les spectateurs et athlètes LGBTQIA+ ?",
      type: "single",
      options: [
        { value: "totally", text: "Oui, totalement" },
        { value: "somewhat", text: "Oui, plutôt" },
        { value: "not_really", text: "Non, pas vraiment" },
        { value: "not_at_all", text: "Non, pas du tout" },
        { value: "unknown", text: "Ne sait pas" }
      ]
    },
    {
      id: 7,
      title: "Solidarité et droits",
      question: "Le programme de billetterie solidaire a permis à des personnes en situation de précarité d'assister aux Jeux gratuitement. Selon vous, cette initiative a-t-elle eu un impact significatif sur l'inclusion sociale ?",
      type: "single",
      options: [
        { value: "very_positive", text: "Oui, très positif" },
        { value: "limited", text: "Oui, mais limité" },
        { value: "little", text: "Non, peu d'impact" },
        { value: "useless", text: "Non, initiative inutile" },
        { value: "unknown", text: "Ne sait pas" }
      ]
    },
    {
      id: 8,
      title: "Vos retours et suggestions",
      question: "Nous aimerions connaître votre avis plus en détail ! Avez-vous des commentaires, suggestions ou témoignages sur les initiatives mises en place pendant les Jeux Olympiques et Paralympiques de Paris 2024 en matière d'inclusion et de diversité ?",
      type: "text",
      placeholder: "Partagez vos expériences ici..."
    }
  ],
  en: [
    {
      id: 1,
      title: "Combating Racism and Inclusion of Minorities",
      question: "In your opinion, which initiatives have most contributed to combating racism and including minorities?",
      type: "single",
      options: [
        { value: "projects", text: "The 1,100 social projects supported by Paris 2024" },
        { value: "campaigns", text: "The diversity of athletes highlighted in official campaigns" },
        { value: "education", text: "Educational and awareness actions in schools and sports clubs" },
        { value: "partners", text: "The commitment of partner organizations against discrimination" },
        { value: "none", text: "None of these initiatives" }
      ]
    },
    {
      id: 2,
      title: "Child and Youth Protection",
      question: "Were there designated children's play areas in fan zones, and were they monitored for safety?",
      type: "single",
      options: [
        { value: "safe", text: "Yes, safely monitored" },
        { value: "unsupervised", text: "Yes, but not monitored" },
        { value: "partial", text: "Yes but not in all of them" },
        { value: "no", text: "No" },
        { value: "unknown", text: "Not sure" }
      ]
    },
    {
      id: 3,
      title: "Women's Sports",
      question: "In your opinion, which initiative has most contributed to promoting women's sports during the Paris 2024 Olympic and Paralympic Games?",
      type: "single",
      options: [
        { value: "balanced", text: "A balanced program with 50% of the 10,500 athletes being women and 28 of the 32 sports featuring the same number of men's and women's events." },
        { value: "mixed", text: "The introduction of 20 mixed events and 152 exclusively female events, allowing women to participate in more than half of all medal-awarding competitions." },
        { value: "coverage", text: "A fairer competition schedule over 16 days, ensuring more balanced media coverage between genders." },
        { value: "marathon", text: "Replacing the men's marathon with a women's marathon as the closing event of the Games." },
        { value: "delegation", text: "The IOC's encouragement for National Olympic Committees to send delegations with at least one male and one female athlete, and to have both genders carry the national flag together during the opening ceremony." }
      ]
    },
    {
      id: 4,
      title: "Sports for All",
      question: "Innovative measures, such as tactile tablets for visually impaired individuals, were introduced to improve competition accessibility. How would you rate the effectiveness of these measures for spectators with disabilities?",
      type: "single",
      options: [
        { value: "very_effective", text: "Very effective" },
        { value: "effective", text: "Effective" },
        { value: "somewhat_effective", text: "Somewhat effective" },
        { value: "not_effective", text: "Not effective at all" },
        { value: "unknown", text: "Not sure" }
      ]
    },
    {
      id: 5,
      title: "Seniors",
      question: "The Paris Sport Seniors program offered free sports activities for Parisians over the age of 55. Do you think this initiative encouraged senior participation in sports activities related to the Games?",
      type: "single",
      options: [
        { value: "significant", text: "Yes, significantly" },
        { value: "somewhat", text: "Yes, to some extent" },
        { value: "no", text: "No, not really" },
        { value: "unknown", text: "Not sure" }
      ]
    },
    {
      id: 6,
      title: "LGBTQIA+",
      question: "Do you think the initiatives led by the organizing committee and the IOC (such as the Pride House and LGBTQIA+ athlete representation) were sufficient to provide a safe and inclusive environment for LGBTQIA+ spectators and athletes?",
      type: "single",
      options: [
        { value: "totally", text: "Yes, completely" },
        { value: "somewhat", text: "Yes, somewhat" },
        { value: "not_really", text: "No, not really" },
        { value: "not_at_all", text: "No, not at all" },
        { value: "unknown", text: "Not sure" }
      ]
    },
    {
      id: 7,
      title: "Solidarity and Rights",
      question: "The solidarity ticketing program allowed people in precarious situations to attend the Games for free. In your opinion, did this initiative have a significant impact on social inclusion?",
      type: "single",
      options: [
        { value: "very_positive", text: "Yes, very positive" },
        { value: "limited", text: "Yes, but limited" },
        { value: "little", text: "No, little impact" },
        { value: "useless", text: "No, useless initiative" },
        { value: "unknown", text: "Not sure" }
      ]
    },
    {
      id: 8,
      title: "Your Feedback and Suggestions",
      question: "We would love to hear your thoughts in more detail! Do you have any comments, suggestions, or testimonies about the inclusion and diversity initiatives implemented during the Paris 2024 Olympic and Paralympic Games?",
      type: "text",
      placeholder: "Share your experiences here..."
    }
  ],
  el: [
    {
      id: 1,
      title: "Καταπολέμηση του ρατσισμού και συμπερίληψη των μειονοτήτων",
      question: "Κατά τη γνώμη σας, ποιες πρωτοβουλίες συνέβαλαν περισσότερο στην καταπολέμηση του ρατσισμού και στη συμπερίληψη των μειονοτήτων;",
      type: "single",
      options: [
        { value: "projects", text: "Τα 1.100 κοινωνικά προγράμματα που υποστηρίχθηκαν από το Παρίσι 2024" },
        { value: "campaigns", text: "Η διαφορετικότητα των αθλητών που αναδείχθηκε σε επίσημες καμπάνιες" },
        { value: "education", text: "Οι δράσεις εκπαίδευσης και ευαισθητοποίησης σε σχολεία και αθλητικούς συλλόγους" },
        { value: "partners", text: "Η δέσμευση των οργανισμών-εταίρων κατά των διακρίσεων" },
        { value: "none", text: "Καμία από αυτές τις πρωτοβουλίες" }
      ]
    },
    {
      id: 2,
      title: "Προστασία Παιδιών και Νέων",
      question: "Υπήρχαν καθορισμένοι χώροι για να παίζουν τα παιδιά στις ζώνες φιλάθλων και επιτηρούνταν για την ασφάλειά τους;",
      type: "single",
      options: [
        { value: "safe", text: "Ναι, επιτηρούνταν με ασφάλεια" },
        { value: "unsupervised", text: "Ναι, αλλά δεν επιτηρούνταν" },
        { value: "no", text: "Όχι" },
        { value: "unknown", text: "Δεν είμαι σίγουρος" }
      ]
    },
    {
      id: 3,
      title: "Γυναικείος Αθλητισμός",
      question: "Κατά τη γνώμη σας, ποια πρωτοβουλία συνέβαλε περισσότερο στην προώθηση του γυναικείου αθλητισμού κατά τη διάρκεια των Ολυμπιακών και Παραολυμπιακών Αγώνων του Παρίσι 2024;",
      type: "single",
      options: [
        { value: "balanced", text: "Ένα ισότιμο πρόγραμμα με το 50% των 10.500 αθλητών να είναι γυναίκες και 28 από τα 32 αθλήματα να περιλαμβάνουν τον ίδιο αριθμό αγωνισμάτων ανδρών και γυναικών." },
        { value: "mixed", text: "Η εισαγωγή 20 μεικτών αγωνισμάτων και 152 αποκλειστικά γυναικείων αγωνισμάτων, επιτρέποντας στις γυναίκες να συμμετέχουν σε περισσότερα από τα μισά από όλα τα αγωνίσματα που απονέμουν μετάλλια." },
        { value: "coverage", text: "Ένα δικαιότερο πρόγραμμα αγώνων σε διάστημα 16 ημερών, εξασφαλίζοντας πιο ισότιμη κάλυψη από τα μέσα μαζικής ενημέρωσης μεταξύ των δύο φύλων." },
        { value: "marathon", text: "Αντικατάσταση του μαραθωνίου των ανδρών με αυτόν των γυναικών ως το τελευταίο αγώνισμα των Αγώνων." },
        { value: "delegation", text: "Η ενθάρρυνση της ΔΟΕ προς τις Εθνικές Ολυμπιακές Επιτροπές να στέλνουν αποστολές με τουλάχιστον έναν άνδρα και μία γυναίκα αθλητή και να κρατούν και τα δύο φύλα μαζί την εθνική σημαία κατά την τελετή έναρξης." }
      ]
    },
    {
      id: 4,
      title: "Αθλητισμός για Όλους",
      question: "Καινοτόμα μέτρα, όπως τάμπλετ αφής για άτομα με προβλήματα όρασης, εφαρμόστηκαν για τη βελτίωση της προσβασιμότητας στους αγώνες. Πώς θα αξιολογούσατε την αποτελεσματικότητα αυτών των μέτρων για τους θεατές με αναπηρία;",
      type: "single",
      options: [
        { value: "very_effective", text: "Πολύ αποτελεσματική" },
        { value: "effective", text: "Αποτελεσματική" },
        { value: "somewhat_effective", text: "Λίγο αποτελεσματική" },
        { value: "not_effective", text: "Καθόλου αποτελεσματική" },
        { value: "unknown", text: "Δεν είμαι σίγουρος" }
      ]
    },
    {
      id: 5,
      title: "Ηλικιωμένοι",
      question: "Το πρόγραμμα Paris Sport Seniors προσέφερε δωρεάν αθλητικές δραστηριότητες για τους Παριζιάνους άνω των 55 ετών. Πιστεύετε ότι η πρωτοβουλία αυτή ενθάρρυνε τη συμμετοχή των ηλικιωμένων σε αθλητικές δραστηριότητες που σχετίζονται με τους Αγώνες;",
      type: "single",
      options: [
        { value: "significant", text: "Ναι, σημαντικά" },
        { value: "somewhat", text: "Ναι, σε κάποιο βαθμό" },
        { value: "no", text: "Όχι διαίτερα" },
        { value: "unknown", text: "Δεν είμαι σίγουρος" }
      ]
    },
    {
      id: 6,
      title: "ΛΟΑΤΚΙ+",
      question: "Πιστεύετε ότι οι πρωτοβουλίες της οργανωτικής επιτροπής και της ΔΟΕ (όπως το Pride House και η εκπροσώπηση των ΛΟΑΤΚΙ+ αθλητών) ήταν επαρκείς για να παρέχουν ένα ασφαλές και συμπεριληπτικό περιβάλλον για τους ΛΟΑΤΚΙ+ θεατές και αθλητές;",
      type: "single",
      options: [
        { value: "totally", text: "Ναι, απόλυτα" },
        { value: "somewhat", text: "Ναι, κάπως" },
        { value: "not_really", text: "Όχι ακριβώς" },
        { value: "not_at_all", text: "Όχι, καθόλου" },
        { value: "unknown", text: "Δεν είμαι σίγουρος" }
      ]
    },
    {
      id: 7,
      title: "Αλληλεγγύη και Δικαιώματα",
      question: "Το πρόγραμμα έκδοσης εισιτηρίων αλληλεγγύης επέτρεψε σε άτομα σε δυσχερή κατάσταση να παρακολουθήσουν δωρεάν τους Αγώνες. Κατά τη γνώμη σας, η πρωτοβουλία αυτή είχε σημαντικό αντίκτυπο στην κοινωνική συμπερίληψη;",
      type: "single",
      options: [
        { value: "very_positive", text: "Ναι, πολύ θετικό" },
        { value: "limited", text: "Ναι, αλλά περιορισμένο" },
        { value: "little", text: "Όχι, μικρό" },
        { value: "useless", text: "Όχι, ανώφελη πρωτοβουλία" },
        { value: "unknown", text: "Δεν είμαι σίγουρος" }
      ]
    },
    {
      id: 8,
      title: "Τα σχόλια και οι προτάσεις σας",
      question: "Θα θέλαμε πολύ να ακούσουμε τις σκέψεις σας με περισσότερες λεπτομέρειες! Έχετε σχόλια, προτάσεις ή μαρτυρίες σχετικά με τις πρωτοβουλίες συμπερίληψης και διαφορετικότητας που υλοποιήθηκαν κατά τη διάρκεια των Ολυμπιακών και Παραολυμπιακών Αγώνων του Παρίσι 2024;",
      type: "text",
      placeholder: "Μοιραστείτε τις εμπειρίες σας εδώ..."
    }
  ]
};
