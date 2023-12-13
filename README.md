# Tanstack Exercise

Facciamo un'app con due pagine:
1) Recuperiamo una lista di post da questa api https://jsonplaceholder.typicode.com/posts, per mostrarli usiamo una tabella paginata
2) Recuperiamo il dettaglio di un post tramite l'api https://jsonplaceholder.typicode.com/posts/id, cliccando sulla riga corrispondente nella tabella accediamo alla pagina di dettaglio.

# UX specifications
Vogliamo che l'utente possa:
- aggiungere nuovi post tramite un form validato
- selezionare il numero di elementi per pagina da mostrare nella tabella
- selezionare una pagina a cui poter saltare
- selezionare una modalità infinite scrolling: non si usa la paginazione, ma si ha una tabella "infinita".
- vedere un toast di errore nel caso in cui una chiamata non vada a buon fine
- vedere un toast di conferma nel caso in cui la chiamata vada a buon fine.

Argomenti trattati:
- routing
- paginazione
- infinite scrolling
- prefetching
- gestione errori

Risorse: 
- https://tanstack.com/
- 