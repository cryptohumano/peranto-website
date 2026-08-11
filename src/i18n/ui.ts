export const languages = {
  es: 'Español',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'es';

export const ui = {
  es: {
    'meta.title': 'Peranto — Soberanía digital con propósito',
    'meta.description':
      'Peranto Protocol: identidad digital autosoberana, credenciales verificables y economía DisCO. Software abierto (CriterIA, Lumo, Aura) con valor que recircula — no renta extractiva.',
    'nav.thesis': 'Tesis',
    'nav.pillars': 'Pilares',
    'nav.research': 'Investigación',
    'nav.principles': 'Principios',
    'nav.explore': 'Explorar',
    'nav.collaborate': 'Colaborar',
    'nav.lab': 'Laboratorio',
    'nav.github': 'GitHub',
    'hero.eyebrow': 'Identidad · Infraestructura · Gobernanza',
    'hero.title': 'Soberanía digital con propósito.',
    'hero.subtitle':
      'Peranto investiga y construye identidad autosoberana, infraestructura y tokenomías que devuelven el control a las personas — sin renunciar al rigor ni a modelos sostenibles.',
    'hero.cta.lab': 'Explorar el laboratorio',
    'hero.cta.criteria': 'Probar CriterIA',
    'hero.cta.github': 'Trabajo abierto',
    'hero.faces.aria': 'Retrato de identidad ilustrado',
    'thesis.label': 'Tesis',
    'thesis.title': 'Construir empresa haciendo el bien',
    'thesis.p1':
      'La identidad digital no debería ser un inicio de sesión delegado a plataformas. Trabajamos con estándares abiertos — DIDs, credenciales verificables — y aplicaciones que mantienen los datos en posesión de quien los genera.',
    'thesis.p2':
      'Exploramos pruebas de conocimiento cero en flujos de identidad, gobierno digital, democracia digital y economías más circulares. No prometemos revoluciones instantáneas: documentamos, verificamos y publicamos lo que aprendemos.',
    'thesis.p3':
      'Peranto articula investigación, comunicación estratégica y software soberano. Si hoy un servicio usa una pasarela tradicional por pragmatismo, lo decimos; la arquitectura apunta a valor y pagos verificables en cadena, con claves en manos de quien participa.',
    'pillars.label': 'Pilares',
    'pillars.title': 'Líneas de trabajo',
    'pillars.ssi.title': 'Identidad autosoberana',
    'pillars.ssi.desc':
      'Identificadores descentralizados y credenciales que la persona controla, verifica y revoca.',
    'pillars.infra.title': 'Infraestructura soberana',
    'pillars.infra.desc':
      'Datos y servicios sin dependencia de un solo proveedor. PWAs y arquitecturas que respetan la posesión.',
    'pillars.zkp.title': 'Privacidad verificable',
    'pillars.zkp.desc':
      'Pruebas de conocimiento cero y diseño de confianza sin exponer más de lo necesario.',
    'pillars.gov.title': 'Gobernanza digital',
    'pillars.gov.desc':
      'Instituciones, participación ciudadana y confianza verificable en contextos públicos.',
    'pillars.token.title': 'Tokenomías con propósito',
    'pillars.token.desc':
      'Coordinar valor entre pares con reglas auditables — alternativa a pasarelas concentradas y a la extracción financiera neocolonial.',
    'pillars.circular.title': 'Economía circular',
    'pillars.circular.desc':
      'Horizonte de investigación: flujos de valor, residuos de datos y regeneración en ecosistemas digitales.',
    'research.label': 'Práctica',
    'research.title': 'Investigación desplegada',
    'research.intro':
      'El núcleo es Peranto Protocol: identidad autosoberana, credenciales verificables y nodos DisCO que recirculan valor. Alrededor, software en producción y experimentos que puedes auditar o autohospedar — sin capturar tus datos.',
    'research.solidarity':
      'No aspiramos a competir con gigantes de mercado a escala global. Publicamos infraestructura para que comunidades desplieguen alternativas — identidad, movilidad, voto, coordinación — en el marco del boycot, desinversión y sanciones (BDS) y la economía solidaria activa: pilotos locales, código abierto, escalabilidad comunitaria.',
    'research.groups.solidarity': 'Economía solidaria comunitaria',
    'research.groups.identity': 'Identidad e infraestructura',
    'research.groups.governance': 'Gobernanza y participación',
    'research.groups.commons': 'Seguridad y bien común',
    'research.groups.health': 'Salud comunitaria',
    'research.payments.label': 'Economía del ecosistema',
    'research.payments.title': 'Identidad que recircula; no renta extractiva',
    'research.payments.lead':
      'Peranto Protocol une SSI y economía DisCO: lo que se paga por identidad y credenciales alimenta un commons temporal que vuelve a los nodos — no a una cuenta privada del protocolo.',
    'research.payments.architecture.title': 'Capa común',
    'research.payments.architecture.body':
      'DID, anclas de VC y fees (nombre, emisión) van a la tesorería del protocolo. CriterIA, Lumo, wallets y líneas ZK se apoyan en esa identidad criptográfica para que la confianza no dependa de un login ni de una pasarela única.',
    'research.payments.bridge.title': 'Puente de hoy',
    'research.payments.bridge.body':
      'En CriterIA el plan gestionado aún usa Stripe por simplicidad operativa: suscripción opcional, sin bloquear el autohospedaje. Es el puente mientras madura el circuito on-chain del protocolo.',
    'research.payments.direction.title': 'Reparto DisCO',
    'research.payments.direction.body':
      'Al cierre de periodo, harvest y distribute regresan valor a los nodos elegibles según Care, Love y anclas. Quien aportó a la capa de identidad participa del recirculo — dividendos cooperativos, no peaje a una EOA.',
    'research.status.live': 'En vivo',
    'research.status.poc': 'PoC funcional',
    'research.status.experiment': 'Experimento',
    'research.link.visit': 'Visitar',
    'research.link.demo': 'Ver demo en vivo',
    'research.link.github': 'Código',
    'research.link.support': 'Plan gestionado',
    'research.projects.lab': 'Laboratorio',
    'research.panel.expand': 'Ver detalles de {project}',
    'research.panel.collapse': 'Ocultar detalles de {project}',
    'research.projects.criteria.title': 'CriterIA',
    'research.projects.criteria.desc':
      'Redacción legal y académica asistida por IA con procedencia verificable: editor colaborativo, agente LLM, firma C2PA e identidad Polkadot/Substrate. Datos en tu dispositivo; código bajo FSL-1.1-MIT.',
    'research.projects.criteria.features.label': 'Características',
    'research.projects.criteria.feat.editor':
      'Editor colaborativo Etherpad (same-origin), presencia en tiempo real y exportación PDF, DOCX y ODT.',
    'research.projects.criteria.feat.agent':
      'Agente LLM (Gemini vía proxy seguro): flujo proponer → revisar → aplicar sobre el documento.',
    'research.projects.criteria.feat.quality':
      'Evaluación de calidad académica con puntuación, nivel y aspectos concretos a mejorar.',
    'research.projects.criteria.feat.provenance':
      'Documentos no repudiables: firma C2PA en servidor y firma Substrate en cliente (Polkadot).',
    'research.projects.criteria.feat.privacy':
      'Redacción reversible de PII por patrones antes de enviar contenido al modelo.',
    'research.projects.criteria.feat.pwa':
      'PWA con datos locales; autohospedaje con tu API key. Licencia FSL-1.1-MIT (apertura diferida a MIT).',
    'research.projects.criteria.feat.orgs':
      'Cuentas personales u organizaciones de equipo, con cuotas de tokens por plan.',
    'research.projects.criteria.feat.sources':
      'Bitácora de fuentes con citas APA y trazabilidad de lo consultado por el agente.',
    'research.projects.criteria.support.title': 'Plan gestionado (Stripe, opcional)',
    'research.projects.criteria.support.body':
      'CriterIA no te encierra: el software es autohospedable y auditable. El plan gestionado (~29 USD/mes, 2M tokens, hasta 5 personas) pasa hoy por Stripe como atajo de facturación — no como identidad del producto. La wallet Substrate en tu dispositivo es la capa de confianza; la salida de pasarelas concentradas es la dirección del ecosistema, no una promesa de marketing.',
    'research.projects.criteria.cta.visit': 'Probar Criteria',
    'research.projects.criteria.cta.support': 'Conocer el plan',
    'research.projects.criteria.gallery.label': 'La plataforma en uso',
    'research.projects.criteria.gallery.expand': 'Ampliar captura',
    'research.projects.criteria.gallery.dialog': 'Vista ampliada de Criteria',
    'research.projects.criteria.gallery.close': 'Cerrar',
    'research.projects.criteria.gallery.prev': 'Anterior',
    'research.projects.criteria.gallery.next': 'Siguiente',
    'research.projects.criteria.shot.editor':
      'Editor con asistente IA: criterio académico, nivel de calidad y consejos en contexto.',
    'research.projects.criteria.shot.quality':
      'Evaluación del documento con puntuación, nivel y aspectos concretos a mejorar.',
    'research.projects.criteria.shot.documents':
      'Biblioteca local de documentos con PDF en el dispositivo y colaboración opcional.',
    'research.projects.criteria.shot.sources':
      'Bitácora de fuentes con citas APA y trazabilidad de lo consultado.',
    'research.projects.criteria.shot.identity':
      'Identidad digital: cuenta de plataforma y wallet Substrate en tu dispositivo.',
    'research.projects.criteria.shot.security':
      'Seguridad con WebAuthn para desbloquear la wallet sin depender solo de contraseña.',
    'research.projects.lumo.title': 'Lumo',
    'research.projects.lumo.desc':
      'Borrador en curso de una plataforma de movilidad y experiencias: pasajeros, conductores y operación para colectivos, empresas de transporte o taxis. PoC funcional con identidad y pagos sobre Polkadot — no está en producción pública.',
    'research.projects.lumo.features.label': 'Qué incluye el PoC',
    'research.projects.lumo.feat.mobility':
      'Solicitud de viajes con mapa, tarifas estimadas, pasajeros y programación; flujos para hosts de experiencias de larga duración.',
    'research.projects.lumo.feat.polkadot':
      'Capa base Substrate/Polkadot para identidad de cuenta y liquidación de pagos (sin depender solo de pasarelas tradicionales).',
    'research.projects.lumo.feat.roles':
      'Roles separados: pasajero, conductor, administración de flota — pensado para adopción comunitaria o empresarial.',
    'research.projects.lumo.feat.ops':
      'Panel para gestionar viajes, asignar conductores y aprobar altas de conductores con documentación.',
    'research.projects.lumo.feat.verify':
      'Inicio de viaje con verificación de ubicación y PIN o código QR entre conductor y pasajero.',
    'research.projects.lumo.feat.deploy':
      'Código abierto y despliegue autohospedado: ofrecido a quien quiera pilotarlo; el desarrollo restante se cotiza al contacto.',
    'research.projects.lumo.adoption.title': '¿Colectivo, empresa de transporte o taxis?',
    'research.projects.lumo.adoption.body':
      'Lumo no compite a escala Uber: es infraestructura para pilotos locales. Si tu organización quiere adoptarlo, revisamos alcance juntos — integración, operación y lo que falte del roadmap — y definimos costo de desarrollo restante sin compromiso comercial agresivo.',
    'research.projects.lumo.cta.contact': 'Consultar adopción',
    'research.projects.lumo.cta.github': 'Ver el código',
    'research.projects.lumo.gallery.label': 'El PoC en pantalla',
    'research.projects.lumo.gallery.expand': 'Ampliar captura',
    'research.projects.lumo.gallery.dialog': 'Vista ampliada de Lumo',
    'research.projects.lumo.gallery.close': 'Cerrar',
    'research.projects.lumo.gallery.prev': 'Anterior',
    'research.projects.lumo.gallery.next': 'Siguiente',
    'research.projects.lumo.shot.map':
      'Pasajero: origen y destino con mapa, ruta estimada y datos del viaje en Ciudad de México (demo).',
    'research.projects.lumo.shot.request':
      'Confirmación de ruta, precio estimado, tipo de vehículo y solicitud de viaje.',
    'research.projects.lumo.shot.admin':
      'Administración: listado de viajes pendientes, precios y asignación de conductores.',
    'research.projects.lumo.shot.onboarding':
      'Alta de conductores: revisión de datos personales, licencia y aprobación por operador.',
    'research.projects.lumo.shot.driver':
      'Conductor: viaje aceptado con distancia, duración, precio y acciones de ruta.',
    'research.projects.lumo.shot.verify':
      'Inicio verificado: ubicación GPS, PIN o QR antes de arrancar el viaje.',
    'research.projects.peranto-protocol.title': 'Peranto Protocol',
    'research.projects.peranto-protocol.desc':
      'Columna vertebral del ecosistema: did:peranto, credenciales verificables y nodos DisCO en EVM/PVM — identidad soberana con economía solidaria on-chain (Paseo / Hardhat).',
    'research.projects.peranto-protocol.disco.title': '¿Qué es una DisCO?',
    'research.projects.peranto-protocol.disco.body':
      'Una DisCO (Distributed Cooperative Organization) es una cooperativa distribuida: miembros, tesoro propio y reglas auditables. No es una DAO que solo maximiza stake: reconoce Livelihood (sustento), Love (commons / pro-bono) y Care (cuidado mutuo y reproducción del colectivo).',
    'research.projects.peranto-protocol.economy.title': 'Economía solidaria en el protocolo',
    'research.projects.peranto-protocol.economy.body':
      'Cada nodo regula la frontera entre lo privado y lo común. Tips, aportes y trabajo documentado mueven Love y Care; el sustento pagado (Livelihood) puede dejar una fracción al tesoro del nodo. La reputación del periodo es medible, no un eslogan.',
    'research.projects.peranto-protocol.dividends.title': 'Identidad que vuelve como dividendo',
    'research.projects.peranto-protocol.dividends.body':
      'Registrar un nombre, anclar una credencial o contribuir al circuito deja fees en la ProtocolTreasury. Al cierre del periodo, harvest y distribute recirculan ese valor a los nodos DisCO elegibles — y desde ahí a quienes sostuvieron la capa de identidad. Quien pagó por existir en el protocolo no alimenta renta extractiva: participa del reparto.',
    'research.projects.peranto-protocol.stack':
      'Contratos + SDK + CLI, Aura Wallet (extensión MV3) y portal con linktr33. Los datos sensibles van en el JWT; en cadena solo el ancla y los flujos económicos.',
    'research.projects.peranto-protocol.gallery.label': 'Portal Peranto',
    'research.projects.peranto-protocol.gallery.expand': 'Ampliar captura',
    'research.projects.peranto-protocol.gallery.dialog': 'Vista ampliada de Peranto Protocol',
    'research.projects.peranto-protocol.gallery.close': 'Cerrar',
    'research.projects.peranto-protocol.gallery.prev': 'Anterior',
    'research.projects.peranto-protocol.gallery.next': 'Siguiente',
    'research.projects.peranto-protocol.shot.identity':
      'Identidad Peranto: wallet, pertenencias DisCO, credenciales y servicios del DID.',
    'research.projects.peranto-protocol.shot.linktr33':
      'Página pública linktr33: perfil @nombre, canales y tarjeta de presentación con QR.',
    'research.projects.peranto-protocol.shot.credentials':
      'Catálogo de schemas DisCO: reclamar, solicitar y emitir Member, EcoTest, CommonsWork y Care.',
    'research.projects.peranto-protocol.shot.economia':
      'Economía solidaria: DISCOs activos, servicios/schemas y reputación Love/Care del periodo.',
    'research.projects.auradid.title': 'AuraDID',
    'research.projects.auradid.desc':
      'Refactor del runtime Substrate de la parachain KILT (descontinuada) hacia Polkadot actual. Credenciales verificables en pausa por incompatibilidad serde entre el legado y los paquetes nuevos.',
    'research.projects.auradid.heritage':
      'KILT sigue siendo el mejor referente de identidad digital que conocemos; el equipo cerró el proyecto. AuraDID conserva esa arquitectura en código abierto para no depender de un proveedor único ni perder el modelo de DIDs y credenciales on-chain.',
    'research.projects.auradid.path':
      'Sigue siendo Substrate: puede desplegarse como solochain y conectarse a Polkadot para pagos en el relay. Refactorizar el runtime heredado es costoso; la vía más viable a medio plazo es migrar la lógica de identidad a contratos inteligentes en EVM.',
    'research.projects.aura.title': 'Aura Wallet',
    'research.projects.aura.desc':
      'PWA base del ecosistema: el usuario es dueño de sus datos — cuentas, firmas y conexión a Polkadot, Kusama y PVM (EVM completa en Polkadot, interoperable con Ethereum).',
    'research.projects.aura.base':
      'Generación de cuentas, firma criptográfica en el dispositivo (WebAuthn, cifrado local) y operación multi-cadena con Dedot. De esta base derivan Andino Wallet y Emergency Wallet.',
    'research.projects.aura.chains':
      'Conecta al relay de Polkadot, a Kusama y a la PVM: una EVM nativa en el ecosistema Polkadot que mantiene interoperabilidad con Ethereum sin abandonar Substrate.',
    'research.projects.andino.title': 'Andino Wallet',
    'research.projects.andino.desc':
      'Bitácora GPS firmada para andinismo: evidencia verificable de cumbres ante la FEACH, sin apps cerradas de rescate comercial.',
    'research.projects.andino.heritage':
      'Experimento con Web3 Chile y la Federación de Andinismo de Chile (FEACH): prevenir fraude cuando alguien declara haber alcanzado una cumbre sin cumplir requisitos.',
    'research.projects.andino.proof':
      'Cada hito GPS se liga a la identidad digital del montañista y a su firma criptográfica, generando una bitácora auditable para la federación.',
    'research.projects.andino.gallery.label': 'Andino en campo',
    'research.projects.andino.gallery.expand': 'Ampliar captura',
    'research.projects.andino.gallery.dialog': 'Vista ampliada de Andino Wallet',
    'research.projects.andino.gallery.close': 'Cerrar',
    'research.projects.andino.gallery.prev': 'Anterior',
    'research.projects.andino.gallery.next': 'Siguiente',
    'research.projects.andino.shot.map':
      'Mapa de bitácoras: rutas y puntos registrados con la wallet en Asset Hub (Paseo).',
    'research.projects.andino.shot.checkpoint':
      'Punto de control con hora, coordenadas GPS, precisión y foto opcional; botón de emergencia accesible.',
    'research.projects.emergency.title': 'Emergency Wallet',
    'research.projects.emergency.desc':
      '«Radio blockchain» para rescatistas: escucha remarks y eventos de emergencia en Polkadot/Kusama/Paseo sin backend central.',
    'research.projects.emergency.body':
      'Codificación orientada a los eventos genéricos en cadena que importan al equipo de rescate: prioridad, ubicación, estado y mapa por cada alerta.',
    'research.projects.emergency.context':
      'Pensado para redes móviles resilientes (p. ej. Starlink en telefonía chilena). Hay limitaciones técnicas, pero prioriza disponibilidad cuando fallan servicios centralizados.',
    'research.projects.emergency.future':
      'En evaluación: capa Meshtastic y redes Maven para convertir señales analógicas de radio en digitales — arquitectura más interesante, con mayor presupuesto de ejecución.',
    'research.projects.emergency.gallery.label': 'Emergency en pantalla',
    'research.projects.emergency.gallery.expand': 'Ampliar captura',
    'research.projects.emergency.gallery.dialog': 'Vista ampliada de Emergency Wallet',
    'research.projects.emergency.gallery.close': 'Cerrar',
    'research.projects.emergency.gallery.prev': 'Anterior',
    'research.projects.emergency.gallery.next': 'Siguiente',
    'research.projects.emergency.shot.radio':
      'Radio de blockchain en vivo: bloque actual, eventos procesados y control de escucha.',
    'research.projects.emergency.shot.list':
      'Listado de emergencias activas con prioridad, tipo y coordenadas GPS.',
    'research.projects.emergency.shot.detail':
      'Detalle de emergencia con mapa (ubicación, inicio de ruta y trazado relacionado).',
    'research.projects.emergency.shot.unlock':
      'Desbloqueo local: la wallet no custodia claves en servidores externos.',
    'research.projects.yohualli.title': 'Yohualli Protocol',
    'research.projects.yohualli.desc':
      'Yohualli (náhuatl: oscuridad de medianoche). Investigación en curso con búsqueda activa de financiamiento: prueba de personalidad no invasiva que verifica humano real sin Sybil, con privacidad y anonimato.',
    'research.projects.yohualli.purpose':
      'Opera donde cualquier autenticación debe saber que hay una persona detrás — no un bot ni un ataque Sybil — sin exigir datos biométricos invasivos ni centralizar el grafo social en un proveedor.',
    'research.projects.yohualli.trilemma':
      'Consciente del trilema de identidad digital (centralización, soberanía, seguridad): fuerte en descentralización y soberanía; más débil en deduplicación, porque las pruebas sociales tienen bajo costo técnico de réplica Sybil y requieren coordinación humana para un grafo sano.',
    'research.projects.yohualli.zk':
      'Las pruebas de conocimiento cero calculan el grafo local y un peso óptimo definido por quien verifica, para sostener teóricamente que la «personalidad» de ese humano es válida. Circuitos en Noir (Aztec) con Barretenberg en las pruebas técnicas.',
    'research.projects.yohualli.compute':
      'Limitación conocida: el ZK es intensivo en CPU. Una PWA puede generar pruebas en teléfonos de gama media y alta; los de gama baja quedan prácticamente excluidos.',
    'research.projects.yohualli.why':
      'Apunta a un entorno digital de confianza con la menor centralización posible — base para gobierno digital, participación ciudadana y ejercicios democráticos.',
    'research.projects.yohualli.funding':
      'Requiere mecenazgo y aliados de sociedad civil e instituciones públicas de democracia; no es excluyente si falta uno de los dos.',
    'research.projects.yohualli.gallery.label': 'Yohualli en el laboratorio',
    'research.projects.yohualli.gallery.expand': 'Ampliar captura',
    'research.projects.yohualli.gallery.dialog': 'Vista ampliada de Yohualli Protocol',
    'research.projects.yohualli.gallery.close': 'Cerrar',
    'research.projects.yohualli.gallery.prev': 'Anterior',
    'research.projects.yohualli.gallery.next': 'Siguiente',
    'research.projects.yohualli.shot.attestation':
      'Código QR y formatos de cuenta (Substrate y EVM) para ceremonias de atestación presencial o coordinada.',
    'research.projects.yohualli.shot.graph':
      'Visualización del grafo local: aristas atestador → sujeto y Tier-SybilRank desde el centro.',
    'research.projects.yohualli.shot.relay':
      'Relay P2P, grafo local en IndexedDB e historial de atestaciones Sr25519 verificables.',
    'research.projects.yohualli.shot.zk':
      'Laboratorio ZK en PWA: circuitos Noir/Barretenberg (Merkle y subject commitment) con tiempos de prueba medidos.',
    'research.projects.zkpoll.title': 'zkPoll',
    'research.projects.zkpoll.desc':
      'Proyecto de hackathon para explorar generación de ZKP en Polkadot con contratos ink! — repositorio inconcluso, sin desarrollo activo planificado.',
    'research.projects.zkpoll.note':
      'Sirvió como experimento formativo; no es producto ni piloto de gobernanza. El trabajo de votación verificable y anonimato sigue en Yohualli y en investigaciones futuras.',
    'research.projects.kume.title': 'Küme',
    'research.projects.kume.desc':
      'Propuesta de la Dra. Carolina Palma Sarmiento (odontóloga chilena): detección temprana de cáncer oral mediante plataforma web Küme y red de odontólogos de diversas universidades.',
    'research.projects.kume.model':
      'Entrenar un modelo de IA con aportes clínicos distribuidos en la red, priorizando soberanía de datos de pacientes y equipos comunitarios — no plataformas sanitarias extractivas.',
    'research.projects.kume.funding':
      'Busca fondos estatales de emprendimiento para su desarrollo. Küme significa bienestar en mapuzungun.',
    'principles.label': 'Principios',
    'principles.title': 'Cómo trabajamos',
    'principles.possession.title': 'Posesión primero',
    'principles.possession.desc':
      'Los datos pertenecen a quien los genera. Diseñamos para minimizar custodia innecesaria.',
    'principles.open.title': 'Apertura verificable',
    'principles.open.desc':
      'Código, estándares y resultados que otros puedan auditar. La confianza se demuestra, no se declara.',
    'principles.rigor.title': 'Rigor y utilidad',
    'principles.rigor.desc':
      'Investigación académica con salida práctica. Cada afirmación merece evidencia o código.',
    'principles.transparency.title': 'Transparencia',
    'principles.transparency.desc':
      'Límites, riesgos y trabajo en curso visibles. Preferimos honestidad a marketing.',
    'explore.label': 'Explorar',
    'explore.title': 'El laboratorio',
    'explore.intro':
      'En el CMS publicamos ensayos, tutoriales y análisis socioeconómico — comunicación estratégica con base académica.',
    'explore.cta': 'Ir al laboratorio',
    'explore.placeholder.title': 'Próximamente en el laboratorio',
    'explore.placeholder.desc':
      'Conecta Ghost con las variables de entorno para mostrar los últimos artículos aquí.',
    'collaborate.label': 'Colaborar',
    'collaborate.title': '¿Cómo colaborar o apoyar?',
    'collaborate.intro':
      'Elige el camino que te corresponda. No todo visitante busca lo mismo — y no todo proyecto pide lo mismo.',
    'collaborate.path.use.title': 'Usar',
    'collaborate.path.use.desc':
      'Prueba CriterIA en producción: redacción con procedencia, firma y soberanía de datos. Es la pieza más madura del ecosistema.',
    'collaborate.path.use.cta': 'Probar CriterIA',
    'collaborate.path.use.secondary': 'Ver todos los proyectos',
    'collaborate.path.research.title': 'Investigar',
    'collaborate.path.research.desc':
      'Explora PoCs, código abierto y artículos del laboratorio. Si eres academia, sociedad civil o institución pública, podemos co-desarrollar.',
    'collaborate.path.research.cta': 'Ver investigación',
    'collaborate.path.research.secondary': 'Escribir sobre investigación',
    'collaborate.path.support.title': 'Apoyar',
    'collaborate.path.support.desc':
      'Yohualli, Küme y otras líneas buscan mecenazgo, grants o alianzas institucionales. No excluimos a quien solo pueda aportar una de las dos vías.',
    'collaborate.path.support.cta': 'Proponer apoyo',
    'collaborate.path.support.secondary': 'Leer en el laboratorio',
    'collaborate.footer':
      'También puedes escribirnos directamente a outreach@peranto.app — respondemos cuando podemos, sin embudo de ventas.',
    'collaborate.email': 'outreach@peranto.app',
    'contact.meta.title': 'Contacto — Peranto',
    'contact.meta.description':
      'Escríbenos sobre CriterIA, Lumo, investigación o apoyo. Respondemos cuando podemos, sin embudo de ventas.',
    'contact.label': 'Contacto',
    'contact.title': 'Hablemos',
    'contact.lead':
      'Cuéntanos qué te interesa. Preferimos WhatsApp o correo — sin formularios interminables.',
    'contact.success': 'Gracias. Recibimos tu mensaje y te contactaremos pronto.',
    'contact.error.missing':
      'Faltan campos obligatorios (nombre, email, teléfono/WhatsApp y mensaje).',
    'contact.error.db':
      'No pudimos guardar el mensaje en el sistema. Si configuraste Telegram, puede que igual te haya llegado ahí. Escríbenos a',
    'contact.error.generic': 'No pudimos enviar el mensaje. Escríbenos a',
    'contact.prefill': 'Prellenamos el formulario con el contexto de',
    'contact.field.name': 'Nombre',
    'contact.field.email': 'Email',
    'contact.field.company': 'Organización (opcional)',
    'contact.field.phone': 'Teléfono / WhatsApp',
    'contact.field.channel': 'Canal preferido',
    'contact.field.interest': 'Interés',
    'contact.field.message': 'Mensaje',
    'contact.channel.whatsapp': 'WhatsApp',
    'contact.channel.email': 'Email',
    'contact.channel.phone': 'Llamada',
    'contact.interest.placeholder': 'Selecciona una opción',
    'contact.submit': 'Enviar mensaje',
    'contact.aside.title': 'Datos directos',
    'contact.aside.collaborate': 'Volver a colaborar',
    'contact.aside.note':
      'Sin embudo de ventas. Leemos cada mensaje y respondemos cuando podemos.',
    'footer.tagline': 'Soberanía digital con propósito.',
    'footer.artBy': 'Arte realizado por:',
    'footer.artistAlt': 'Cripto Street',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.analytics':
      'Estadísticas agregadas sin cookies de marketing (p. ej. Plausible o Umami).',
    'lang.switch': 'EN',
  },
  en: {
    'meta.title': 'Peranto — Digital sovereignty, on purpose',
    'meta.description':
      'Peranto Protocol: self-sovereign digital identity, verifiable credentials, and DisCO economics. Open software (CriterIA, Lumo, Aura) with value that recirculates — not extractive rent.',
    'nav.thesis': 'Thesis',
    'nav.pillars': 'Pillars',
    'nav.research': 'Research',
    'nav.principles': 'Principles',
    'nav.explore': 'Explore',
    'nav.collaborate': 'Collaborate',
    'nav.lab': 'Lab',
    'nav.github': 'GitHub',
    'hero.eyebrow': 'Identity · Infrastructure · Governance',
    'hero.title': 'Digital sovereignty, on purpose.',
    'hero.subtitle':
      'Peranto researches and builds self-sovereign identity, infrastructure, and tokenomics that return control to people — without trading rigor for sustainability.',
    'hero.cta.lab': 'Explore the lab',
    'hero.cta.criteria': 'Try CriterIA',
    'hero.cta.github': 'Open work',
    'hero.faces.aria': 'Illustrated identity portrait',
    'thesis.label': 'Thesis',
    'thesis.title': 'Building a company that does good',
    'thesis.p1':
      'Digital identity should not be a login outsourced to platforms. We work with open standards — DIDs, verifiable credentials — and applications that keep data in the possession of those who create it.',
    'thesis.p2':
      'We explore zero-knowledge proofs in identity flows, digital government, digital democracy, and more circular economies. We do not promise instant revolutions: we document, verify, and publish what we learn.',
    'thesis.p3':
      'Peranto connects research, strategic communication, and sovereign software. If a service still uses a traditional payment gateway for pragmatism, we say so; the architecture aims at verifiable on-chain value and payments, with keys held by participants.',
    'pillars.label': 'Pillars',
    'pillars.title': 'Lines of work',
    'pillars.ssi.title': 'Self-sovereign identity',
    'pillars.ssi.desc':
      'Decentralized identifiers and credentials that people control, verify, and revoke.',
    'pillars.infra.title': 'Sovereign infrastructure',
    'pillars.infra.desc':
      'Data and services without single-vendor lock-in. PWAs and architectures that respect possession.',
    'pillars.zkp.title': 'Verifiable privacy',
    'pillars.zkp.desc':
      'Zero-knowledge proofs and trust design without exposing more than necessary.',
    'pillars.gov.title': 'Digital governance',
    'pillars.gov.desc':
      'Institutions, civic participation, and verifiable trust in public contexts.',
    'pillars.token.title': 'Purpose-driven tokenomics',
    'pillars.token.desc':
      'Peer-to-peer value with auditable rules — an alternative to concentrated payment rails and extractive financial infrastructure.',
    'pillars.circular.title': 'Circular economy',
    'pillars.circular.desc':
      'Research horizon: value flows, data waste, and regeneration in digital ecosystems.',
    'research.label': 'Practice',
    'research.title': 'Deployed research',
    'research.intro':
      'The spine is Peranto Protocol: self-sovereign identity, verifiable credentials, and DisCO nodes that recirculate value. Around it, production software and experiments you can audit or self-host — without capturing your data.',
    'research.solidarity':
      'We are not trying to outscale global market giants. We publish infrastructure so communities can deploy alternatives — identity, mobility, voting, coordination — within boycott, divestment, and sanctions (BDS) and active solidarity economies: local pilots, open source, community-scale growth.',
    'research.groups.solidarity': 'Community solidarity economy',
    'research.groups.identity': 'Identity and infrastructure',
    'research.groups.governance': 'Governance and participation',
    'research.groups.commons': 'Safety and commons',
    'research.groups.health': 'Community health',
    'research.payments.label': 'Ecosystem economics',
    'research.payments.title': 'Identity that recirculates — not extractive rent',
    'research.payments.lead':
      'Peranto Protocol joins SSI and DisCO economics: what is paid for identity and credentials feeds a temporary commons that returns to the nodes — not to a private protocol account.',
    'research.payments.architecture.title': 'Shared layer',
    'research.payments.architecture.body':
      'DIDs, VC anchors, and fees (name, issuance) flow into the protocol treasury. CriterIA, Lumo, wallets, and ZK lines lean on that cryptographic identity so trust does not depend on a corporate login or a single gateway.',
    'research.payments.bridge.title': 'Today’s bridge',
    'research.payments.bridge.body':
      'On CriterIA, the managed plan still uses Stripe for operational simplicity: optional subscription, without blocking self-hosting. It is the bridge while the protocol’s on-chain circuit matures.',
    'research.payments.direction.title': 'DisCO distribution',
    'research.payments.direction.body':
      'At period close, harvest and distribute return value to eligible nodes by Care, Love, and anchors. Whoever contributed to the identity layer joins the recirculation — cooperative dividends, not a toll to an EOA.',
    'research.status.live': 'Live',
    'research.status.poc': 'Functional PoC',
    'research.status.experiment': 'Experiment',
    'research.link.visit': 'Visit',
    'research.link.demo': 'View live demo',
    'research.link.github': 'Code',
    'research.link.support': 'Managed plan',
    'research.projects.lab': 'Lab',
    'research.panel.expand': 'Show {project} details',
    'research.panel.collapse': 'Hide {project} details',
    'research.projects.criteria.title': 'CriterIA',
    'research.projects.criteria.desc':
      'AI-assisted legal and academic writing with verifiable provenance: collaborative editor, LLM agent, C2PA signing, and Polkadot/Substrate identity. Data on your device; code under FSL-1.1-MIT.',
    'research.projects.criteria.features.label': 'Features',
    'research.projects.criteria.feat.editor':
      'Collaborative Etherpad editor (same-origin), real-time presence, and PDF, DOCX, and ODT export.',
    'research.projects.criteria.feat.agent':
      'LLM agent (Gemini via secure proxy): propose → review → apply workflow on your document.',
    'research.projects.criteria.feat.quality':
      'Academic quality evaluation with score, level, and specific areas to improve.',
    'research.projects.criteria.feat.provenance':
      'Non-repudiable documents: C2PA signing on the server and Substrate signing on the client (Polkadot).',
    'research.projects.criteria.feat.privacy':
      'Reversible PII redaction by pattern before sending content to the model.',
    'research.projects.criteria.feat.pwa':
      'PWA with local data; self-host with your API key. FSL-1.1-MIT license (deferred MIT release).',
    'research.projects.criteria.feat.orgs':
      'Personal accounts or team organizations with per-plan token quotas.',
    'research.projects.criteria.feat.sources':
      'Source log with APA citations and traceability of what the agent consulted.',
    'research.projects.criteria.support.title': 'Managed plan (Stripe, optional)',
    'research.projects.criteria.support.body':
      'CriterIA does not lock you in: the software is self-hostable and auditable. The managed plan (~$29 USD/month, 2M tokens, up to 5 people) currently bills through Stripe as a convenience — not as the product’s identity. Your on-device Substrate wallet is the trust layer; moving off concentrated gateways is the ecosystem direction, not marketing hype.',
    'research.projects.criteria.cta.visit': 'Try Criteria',
    'research.projects.criteria.cta.support': 'See the plan',
    'research.projects.criteria.gallery.label': 'The platform in use',
    'research.projects.criteria.gallery.expand': 'Expand screenshot',
    'research.projects.criteria.gallery.dialog': 'Criteria enlarged view',
    'research.projects.criteria.gallery.close': 'Close',
    'research.projects.criteria.gallery.prev': 'Previous',
    'research.projects.criteria.gallery.next': 'Next',
    'research.projects.criteria.shot.editor':
      'Editor with AI assistant: academic criteria, quality level, and contextual advice.',
    'research.projects.criteria.shot.quality':
      'Document evaluation with score, level, and specific areas to improve.',
    'research.projects.criteria.shot.documents':
      'Local document library with on-device PDF and optional collaboration.',
    'research.projects.criteria.shot.sources':
      'Source log with APA citations and traceability of what was consulted.',
    'research.projects.criteria.shot.identity':
      'Digital identity: platform account and Substrate wallet on your device.',
    'research.projects.criteria.shot.security':
      'WebAuthn security to unlock the wallet without relying on password alone.',
    'research.projects.lumo.title': 'Lumo',
    'research.projects.lumo.desc':
      'Work-in-progress mobility and experiences platform: passengers, drivers, and ops for collectives, transport companies, or taxi fleets. Functional PoC with Polkadot-based identity and payments — not in public production.',
    'research.projects.lumo.features.label': 'What the PoC includes',
    'research.projects.lumo.feat.mobility':
      'Trip requests with map, fare estimates, passengers, and scheduling; flows for long-duration experience hosts.',
    'research.projects.lumo.feat.polkadot':
      'Substrate/Polkadot base layer for account identity and payment settlement (not only traditional gateways).',
    'research.projects.lumo.feat.roles':
      'Separate roles: passenger, driver, fleet admin — aimed at community or enterprise adoption.',
    'research.projects.lumo.feat.ops':
      'Panel to manage trips, assign drivers, and approve driver onboarding with documentation.',
    'research.projects.lumo.feat.verify':
      'Trip start with location check and PIN or QR code between driver and passenger.',
    'research.projects.lumo.feat.deploy':
      'Open code and self-hosting: offered to teams who want to pilot it; remaining development is quoted on contact.',
    'research.projects.lumo.adoption.title': 'Collective, transport company, or taxis?',
    'research.projects.lumo.adoption.body':
      'Lumo is not Uber at scale: it is infrastructure for local pilots. If your organization wants to adopt it, we review scope together — integration, operations, and roadmap gaps — and agree on remaining development cost without aggressive commercial lock-in.',
    'research.projects.lumo.cta.contact': 'Discuss adoption',
    'research.projects.lumo.cta.github': 'View the code',
    'research.projects.lumo.gallery.label': 'The PoC on screen',
    'research.projects.lumo.gallery.expand': 'Expand screenshot',
    'research.projects.lumo.gallery.dialog': 'Lumo enlarged view',
    'research.projects.lumo.gallery.close': 'Close',
    'research.projects.lumo.gallery.prev': 'Previous',
    'research.projects.lumo.gallery.next': 'Next',
    'research.projects.lumo.shot.map':
      'Passenger: origin and destination with map, estimated route, and trip data (demo).',
    'research.projects.lumo.shot.request':
      'Route confirmation, estimated fare, vehicle type, and trip request.',
    'research.projects.lumo.shot.admin':
      'Admin: pending trips list, pricing, and driver assignment.',
    'research.projects.lumo.shot.onboarding':
      'Driver onboarding: personal data, license review, and operator approval.',
    'research.projects.lumo.shot.driver':
      'Driver: accepted trip with distance, duration, fare, and route actions.',
    'research.projects.lumo.shot.verify':
      'Verified start: GPS location, PIN or QR before the trip begins.',
    'research.projects.peranto-protocol.title': 'Peranto Protocol',
    'research.projects.peranto-protocol.desc':
      'Spine of the ecosystem: did:peranto, verifiable credentials, and DisCO nodes on EVM/PVM — sovereign identity with on-chain solidarity economics (Paseo / Hardhat).',
    'research.projects.peranto-protocol.disco.title': 'What is a DisCO?',
    'research.projects.peranto-protocol.disco.body':
      'A DisCO (Distributed Cooperative Organization) is a distributed cooperative: members, its own treasury, and auditable rules. It is not a DAO that only maximizes stake — it recognizes Livelihood (income), Love (commons / pro-bono), and Care (mutual care and reproducing the collective).',
    'research.projects.peranto-protocol.economy.title': 'Solidarity economy in the protocol',
    'research.projects.peranto-protocol.economy.body':
      'Each node sets the boundary between private and common. Tips, contributions, and documented work move Love and Care; paid livelihood can leave a share to the node treasury. Period reputation is measurable, not a slogan.',
    'research.projects.peranto-protocol.dividends.title': 'Identity that returns as dividend',
    'research.projects.peranto-protocol.dividends.body':
      'Registering a name, anchoring a credential, or contributing to the circuit leaves fees in the ProtocolTreasury. At period close, harvest and distribute recirculate that value to eligible DisCO nodes — and from there to those who sustained the identity layer. Paying to exist in the protocol does not feed extractive rent: it joins the share-out.',
    'research.projects.peranto-protocol.stack':
      'Contracts + SDK + CLI, Aura Wallet (MV3 extension), and a portal with linktr33. Sensitive data lives in the JWT; only the anchor and economic flows sit on-chain.',
    'research.projects.peranto-protocol.gallery.label': 'Peranto portal',
    'research.projects.peranto-protocol.gallery.expand': 'Expand screenshot',
    'research.projects.peranto-protocol.gallery.dialog': 'Peranto Protocol enlarged view',
    'research.projects.peranto-protocol.gallery.close': 'Close',
    'research.projects.peranto-protocol.gallery.prev': 'Previous',
    'research.projects.peranto-protocol.gallery.next': 'Next',
    'research.projects.peranto-protocol.shot.identity':
      'Peranto identity: wallet, DisCO memberships, credentials, and DID services.',
    'research.projects.peranto-protocol.shot.linktr33':
      'Public linktr33 page: @name profile, channels, and business card with QR.',
    'research.projects.peranto-protocol.shot.credentials':
      'DisCO schema catalog: claim, request, and issue Member, EcoTest, CommonsWork, and Care.',
    'research.projects.peranto-protocol.shot.economia':
      'Solidarity economy: active DISCOs, services/schemas, and period Love/Care reputation.',
    'research.projects.auradid.title': 'AuraDID',
    'research.projects.auradid.desc':
      'Refactor of the discontinued KILT parachain Substrate runtime onto current Polkadot. Verifiable credentials paused: legacy serde no longer matches newer Polkadot serialization packages.',
    'research.projects.auradid.heritage':
      'KILT remains the best digital-identity reference we know; the team shut the project down. AuraDID keeps that architecture as open source so we are not locked to one vendor or the on-chain DID and credential model.',
    'research.projects.auradid.path':
      'Still Substrate: it can run as a solochain and connect to Polkadot for relay payments. Refactoring the inherited runtime is expensive; the most viable medium-term path is migrating identity logic to EVM smart contracts.',
    'research.projects.aura.title': 'Aura Wallet',
    'research.projects.aura.desc':
      'Ecosystem base PWA: users own their data — accounts, signing, and connections to Polkadot, Kusama, and PVM (full EVM on Polkadot, Ethereum-interoperable).',
    'research.projects.aura.base':
      'Account generation, on-device cryptographic signing (WebAuthn, local encryption), and multi-chain operation with Dedot. Andino Wallet and Emergency Wallet build on this base.',
    'research.projects.aura.chains':
      'Connects to the Polkadot relay, Kusama, and PVM: a native EVM in the Polkadot ecosystem that stays interoperable with Ethereum without leaving Substrate.',
    'research.projects.andino.title': 'Andino Wallet',
    'research.projects.andino.desc':
      'Signed GPS logbook for mountaineering: verifiable summit evidence for FEACH, without closed commercial rescue apps.',
    'research.projects.andino.heritage':
      'Experiment with Web3 Chile and the Chilean Mountaineering Federation (FEACH): prevent fraud when someone claims a summit without meeting requirements.',
    'research.projects.andino.proof':
      'Each GPS milestone ties to the climber’s digital identity and cryptographic signature, producing an auditable log for the federation.',
    'research.projects.andino.gallery.label': 'Andino in the field',
    'research.projects.andino.gallery.expand': 'Expand screenshot',
    'research.projects.andino.gallery.dialog': 'Andino Wallet enlarged view',
    'research.projects.andino.gallery.close': 'Close',
    'research.projects.andino.gallery.prev': 'Previous',
    'research.projects.andino.gallery.next': 'Next',
    'research.projects.andino.shot.map':
      'Logbook map: routes and checkpoints recorded on Asset Hub (Paseo).',
    'research.projects.andino.shot.checkpoint':
      'Checkpoint with time, GPS coordinates, accuracy, optional photo, and quick emergency access.',
    'research.projects.emergency.title': 'Emergency Wallet',
    'research.projects.emergency.desc':
      'Blockchain “radio” for rescuers: listens for emergency remarks and events on Polkadot/Kusama/Paseo with no central backend.',
    'research.projects.emergency.body':
      'Encoding focused on the on-chain generic events that matter to rescue teams: priority, location, status, and map per alert.',
    'research.projects.emergency.context':
      'Designed for resilient mobile networks (e.g. Starlink in Chilean cellular). Technical limits remain, but the approach favors availability when centralized services fail.',
    'research.projects.emergency.future':
      'Under review: Meshtastic and Maven mesh layers to turn analog radio signals into digital ones — a richer architecture that needs more execution budget.',
    'research.projects.emergency.gallery.label': 'Emergency on screen',
    'research.projects.emergency.gallery.expand': 'Expand screenshot',
    'research.projects.emergency.gallery.dialog': 'Emergency Wallet enlarged view',
    'research.projects.emergency.gallery.close': 'Close',
    'research.projects.emergency.gallery.prev': 'Previous',
    'research.projects.emergency.gallery.next': 'Next',
    'research.projects.emergency.shot.radio':
      'Live blockchain radio: current block, processed events, and listen controls.',
    'research.projects.emergency.shot.list':
      'Active emergencies with priority, type, and GPS coordinates.',
    'research.projects.emergency.shot.detail':
      'Emergency detail with map (location, route start, and related track).',
    'research.projects.emergency.shot.unlock':
      'Local unlock: the wallet does not custody keys on external servers.',
    'research.projects.yohualli.title': 'Yohualli Protocol',
    'research.projects.yohualli.desc':
      'Yohualli (Nahuatl: midnight darkness). Ongoing research actively seeking funding: non-invasive proof of personhood that verifies a real human without Sybil attacks, preserving privacy and anonymity.',
    'research.projects.yohualli.purpose':
      'Works wherever authentication must establish a person behind the account — not a bot or Sybil attack — without invasive biometrics or centralizing the social graph in one vendor.',
    'research.projects.yohualli.trilemma':
      'Aware of the digital-identity trilemma (centralization, sovereignty, security): strong on decentralization and sovereignty; weaker on deduplication, because social proofs have low technical Sybil replication cost and need human coordination for a healthy graph.',
    'research.projects.yohualli.zk':
      'Zero-knowledge proofs compute the local graph and an optimal weight defined by the verifier to theoretically validate that human “personality.” Technical circuits in Noir (Aztec) with Barretenberg in the lab.',
    'research.projects.yohualli.compute':
      'Known limit: ZK is CPU-intensive. A PWA can generate proofs on mid- and high-tier phones; low-end devices are effectively excluded.',
    'research.projects.yohualli.why':
      'Aims for a trust environment with minimal centralization — groundwork for digital government, civic participation, and democratic practice.',
    'research.projects.yohualli.funding':
      'Needs patronage and allies from civil society and public democracy institutions; not exclusive if one side is missing.',
    'research.projects.yohualli.gallery.label': 'Yohualli in the lab',
    'research.projects.yohualli.gallery.expand': 'Expand screenshot',
    'research.projects.yohualli.gallery.dialog': 'Yohualli Protocol enlarged view',
    'research.projects.yohualli.gallery.close': 'Close',
    'research.projects.yohualli.gallery.prev': 'Previous',
    'research.projects.yohualli.gallery.next': 'Next',
    'research.projects.yohualli.shot.attestation':
      'QR code and account formats (Substrate and EVM) for in-person or coordinated attestation ceremonies.',
    'research.projects.yohualli.shot.graph':
      'Local graph view: attester → subject edges and Tier-SybilRank from the center.',
    'research.projects.yohualli.shot.relay':
      'P2P relay, local graph in IndexedDB, and verifiable Sr25519 attestation history.',
    'research.projects.yohualli.shot.zk':
      'ZK lab in the PWA: Noir/Barretenberg circuits (Merkle and subject commitment) with measured prove times.',
    'research.projects.zkpoll.title': 'zkPoll',
    'research.projects.zkpoll.desc':
      'Hackathon project to explore ZKP generation on Polkadot with ink! contracts — unfinished repository, no active development planned.',
    'research.projects.zkpoll.note':
      'A learning experiment only; not a governance product or pilot. Verifiable voting and anonymity live in Yohualli and future work.',
    'research.projects.kume.title': 'Küme',
    'research.projects.kume.desc':
      'Proposal by Dr. Carolina Palma Sarmiento (Chilean dentist): early oral cancer detection via the Küme web platform and a network of dentists from multiple universities.',
    'research.projects.kume.model':
      'Train an AI model with distributed clinical contributions from the network, prioritizing patient data sovereignty and community teams — not extractive health platforms.',
    'research.projects.kume.funding':
      'Seeking state entrepreneurship grants for development. Küme means wellbeing in Mapuzungun.',
    'principles.label': 'Principles',
    'principles.title': 'How we work',
    'principles.possession.title': 'Possession first',
    'principles.possession.desc':
      'Data belongs to those who generate it. We design to minimize unnecessary custody.',
    'principles.open.title': 'Verifiable openness',
    'principles.open.desc':
      'Code, standards, and results others can audit. Trust is demonstrated, not declared.',
    'principles.rigor.title': 'Rigor and utility',
    'principles.rigor.desc':
      'Academic research with practical output. Every claim deserves evidence or code.',
    'principles.transparency.title': 'Transparency',
    'principles.transparency.desc':
      'Limits, risks, and work-in-progress visible. We prefer honesty to marketing.',
    'explore.label': 'Explore',
    'explore.title': 'The lab',
    'explore.intro':
      'On the CMS we publish essays, tutorials, and socioeconomic analysis — strategic communication with academic grounding.',
    'explore.cta': 'Go to the lab',
    'explore.placeholder.title': 'Coming soon in the lab',
    'explore.placeholder.desc':
      'Connect Ghost via environment variables to show the latest articles here.',
    'collaborate.label': 'Collaborate',
    'collaborate.title': 'How to collaborate or support',
    'collaborate.intro':
      'Pick the path that fits you. Not every visitor wants the same thing — and not every project needs the same kind of help.',
    'collaborate.path.use.title': 'Use',
    'collaborate.path.use.desc':
      'Try CriterIA in production: writing with provenance, signing, and data sovereignty. It is the most mature piece of the ecosystem.',
    'collaborate.path.use.cta': 'Try CriterIA',
    'collaborate.path.use.secondary': 'Browse all projects',
    'collaborate.path.research.title': 'Research',
    'collaborate.path.research.desc':
      'Explore PoCs, open source, and lab articles. If you are academia, civil society, or a public institution, we can co-develop.',
    'collaborate.path.research.cta': 'View research',
    'collaborate.path.research.secondary': 'Email about research',
    'collaborate.path.support.title': 'Support',
    'collaborate.path.support.desc':
      'Yohualli, Küme, and other lines seek patronage, grants, or institutional partnerships. We are not exclusive if you can only offer one path.',
    'collaborate.path.support.cta': 'Offer support',
    'collaborate.path.support.secondary': 'Read in the lab',
    'collaborate.footer':
      'You can also write us at outreach@peranto.app — we reply when we can, with no sales funnel.',
    'collaborate.email': 'outreach@peranto.app',
    'contact.meta.title': 'Contact — Peranto',
    'contact.meta.description':
      'Write about CriterIA, Lumo, research, or support. We reply when we can, with no sales funnel.',
    'contact.label': 'Contact',
    'contact.title': "Let's talk",
    'contact.lead':
      'Tell us what you care about. We prefer WhatsApp or email — no endless forms.',
    'contact.success': 'Thanks. We received your message and will get back to you soon.',
    'contact.error.missing':
      'Required fields are missing (name, email, phone/WhatsApp, and message).',
    'contact.error.db':
      'We could not save your message in the system. If Telegram is configured, it may still have arrived there. Write us at',
    'contact.error.generic': 'We could not send your message. Write us at',
    'contact.prefill': 'We prefilled the form with context from',
    'contact.field.name': 'Name',
    'contact.field.email': 'Email',
    'contact.field.company': 'Organization (optional)',
    'contact.field.phone': 'Phone / WhatsApp',
    'contact.field.channel': 'Preferred channel',
    'contact.field.interest': 'Interest',
    'contact.field.message': 'Message',
    'contact.channel.whatsapp': 'WhatsApp',
    'contact.channel.email': 'Email',
    'contact.channel.phone': 'Call',
    'contact.interest.placeholder': 'Select an option',
    'contact.submit': 'Send message',
    'contact.aside.title': 'Direct details',
    'contact.aside.collaborate': 'Back to collaborate',
    'contact.aside.note':
      'No sales funnel. We read every message and reply when we can.',
    'footer.tagline': 'Digital sovereignty, on purpose.',
    'footer.artBy': 'Artwork by:',
    'footer.artistAlt': 'Cripto Street',
    'footer.rights': 'All rights reserved.',
    'footer.analytics':
      'Aggregate stats with no marketing cookies (e.g. Plausible or Umami).',
    'lang.switch': 'ES',
  },
} as const;

export type UIKey = keyof (typeof ui)[Lang];

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key];
  };
}

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Lang;
  return defaultLang;
}

export function getAlternateLang(lang: Lang): Lang {
  return lang === 'es' ? 'en' : 'es';
}

export function pathForLang(lang: Lang, hash = ''): string {
  return `/${lang}/${hash}`;
}
