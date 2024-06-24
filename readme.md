# Formation JQuery / Bootstrap

## Un framework
JQuery est un framework, un cadre de travail ou un ensemble de fonctions javascript organisées en bibliothèques. Le but de JQuery est de simplifier ke JS interractif, en simplifiant l'écriture des appels de fonctions, d'évènements, la manipulation du DOM, etc.

### "Installer" JQuery
Il suffit de télécharger la dernière version du fichier jquery sur le site jquery.com, de le déposer dans un répertoire dans le projet et d'y faire appel dans le head de la page.

### Démarrer avec JQuery
Comme avec JS, il faut que le DOM soit complètement chargé pour qu'on puisse le manipuler avec JQuery.

Pour cela, on va utilise la fonction jQuery .ready(), qui ne permettra d'utiliser le code à l'intérieur qu'à partir du moment ou le DOM est complètement chargé.

### Éviter les conflits
Il est possible d'utiliser un alias pour utiliser JQuery : $() Mais cet alias est souvent utilisé par beaucoup d'autres bibliothèques Js qui pourraient être appelée en même temps que JQuery. En changeant la déclaration on peut facilement éviter ce conflit

## Principe de fonctionnement
JQuery reponse principalement sur l'alias $(), on va ciblé à l'aide des sélecteurs HTML les éléments de la page sur lesquels interviadra le script.

### Les sélecteurs
Les sélecteurs CSS
On peut utiliser des sélecteurs semblables aux sélécteurs CSS pour cibles les éléments. Un élément peut être ciblé en balise &lt;p&gt;, par id en utilisant #, par classe avec le . (point) .

### Sélécteurs plus poussés
Il est possible de cibler des éléments selon leur place.

On fait aussi la différence entre les éléments contenus dans d'autres éléments (parents) et les descendants (enfants) directs d'un autre élément

### Les sélecteur $(this)
Le sélecteur $(this) permet d'associer une action

à l'objet courant qu'il représente

quand on appelle la fonction depuis un élément

$(this) permet de savoir quel élément d'une multitude a été choisis

### Les évènements

Définition d'un évènement
Un évènement est une action remplie par le navigateur ou via le navigateur : depuis la souris, clavier, clic sur la page, etc.

## Évènements sur la souris

|Action |	Fonction |
|-------|------------|
|Clic   |	click()|
|Double clic    |	dblclick()|
|Survol de la souris    |	hover()|
|Rentrer dans un élément    |	mouseenter()|
|Quitter un élément |	mouseleave()|
|Presser un bouton de la souris |	mousedown()|
|Relâcher un bouton de la souris    |	mouseup()|
|Scroller (utiliser la roulette)    |	scroll()|


## Évènement au clavier
|Action |	Fonction |
|-------|------------|
|Touche du clavier est enfoncée |	keydown()|
|Maintient d'une touche enfoncée    |	keypress()|
|Relâchement d'une touche préalablement enfoncée    |	keyup()|

## Quelle touche ?
Pour lire la touche utilisée par l'utilisateur,il faut faire attention car la fonction a utiliser sur l'évènement diffère selon les navigateurs. Heureusement, seulement deux fonction différentes et non une par navigateur existant.

## Évènements sur les formulaires

|Action |	Fonction |
|-------|------------|
|Focalisation   |	focus()|
|Sélection (p.e. dans une liste)    |	select()|
|Changement de valeur   |	change()|
|Envoi du formulaire    |	submit()|

## Déclenchement virtuel
On peut déclencher virtuellement des évènements associés à des éléments.

## Annuler un comportement par défaut
On peut annuler un comportement par défaut, par exemple la soumission d'un formulaire quand l'utilisateur clique sur la soummision du formulaire. C'est souvent utilisé dans ce cas pour vérifier la bonne complétion des champs ensuite si il manque des infos on le signale, sinon on soumet via script le formulaire correctement remplie.

on utilise pour cela .preventDefault() sur l'évènement que l'on souhaite empêcher.

### Gestionnaire d'évènements

Le gestionnaire d'évènements permet de configurer sur une seul élément plusieurs écouteurs différents (click, bdclick, hover, etc.).

Gestion même comportement selon deux évènements différents

Gestion par un gestionnaire d'évènements : un comportement différent par évènement

### La délégation
La délégation permet de repérer un évènement sur un élément ajouté après le chargement du DOM (donc inécoutable avec $("#element")).

On peut en revanche écouter l'évèment sur un élément parent qui lui a été chargé dans le DOM

Pour la délégation, il faut trois éléments :

- Le type d'évènement que l'on écoute
- L'élément parent écouté qui nous renvoie la cible de l'évènement
- La fonction en retour liée à l'évènement

## Les espaces de noms
### Définition
Permettent de désigner un évènement très précisément, ils sont a utiliser avec les gestionnaires d'évènements. Ils ont une syntaxe particulière :

event.namespace

- event : le type d'évènement qui "subi" un espace de nom
- le point fait la liaison avec l'espace de nom
- namespace : la dénomination de l'espace de nom

### Utilité des namespace
Différentes fonctions peuvent être exécutées depuis un même évènement

- On peut définir plusieurs espaces de noms pour un même évènement
- On ne peut pas appeler plusieurs espaces de noms en même temps
- On peut aussi préciser le type d'évènement sans préciser l'espace de nom, toutes les action liées à l'évènement seront exécutées sans tenir compte du namespace.
- On ne peut pas préciser un namespace sans l'associer à un évènement.
```
on("click.nom.prenom", ...) /* défini en même temps click.nom et click.prenom */
trigger("click.nom.prenom") /* ne marche pas */
//on fera
trigger("click.nom")
trigger("click.prenom")
trigger("click") /* déclenche toutes les fonctions associées aux espaces de noms sur le clic */
trigger(".nom") /* ne fonctionne pas */
```

### Supprimer les écouteurs d'évènements
La fonction inverse de .on() est .off() et permet de supprimer les écouteurs d'évènement mis en place.

si on utilise .on() sans attribut, on annule tous les écouteurs de l'élément.

Dans les arguments de .off() on peut préciser quel event on annule sur l'élément