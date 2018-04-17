<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Competec Styleguide</title>
    <link rel="stylesheet" href="css/material-components-web.min.css">
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/styleguide.css">
</head>
</head>

<body id="home">
<header class="mdc-top-app-bar">
    <div class="mdc-top-app-bar__row">
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
            <span class="mdc-top-app-bar__title">Competec Styleguide</span>
        </section>
    </div>
</header>
<div class="style-guide-content">
        <nav class="mdc-drawer mdc-drawer--permanent mdc-typography">
            <nav class="mdc-list">
                <a class="mdc-list-item mdc-list-item--activated" href="#">
                    Buttons
                </a>
            </nav>
        </nav>
    <main class="style-guide-main">
        {{componentList}}
    </main>
</div>

<script src="scripts/material-components-web.js"></script>
<script src="scripts/run_prettify_html.js"></script>
<script>
    mdc.autoInit();
</script>
</body>
</html>
