-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : ven. 27 août 2021 à 21:27
-- Version du serveur : 10.4.20-MariaDB
-- Version de PHP : 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `deviantart`
--

-- --------------------------------------------------------

--
-- Structure de la table `collections`
--

CREATE TABLE `collections` (
  `idCollection` int(11) NOT NULL,
  `titreCollection` varchar(255) NOT NULL,
  `descriptionCollection` int(11) NOT NULL,
  `idMembre` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `collections`
--

INSERT INTO `collections` (`idCollection`, `titreCollection`, `descriptionCollection`, `idMembre`) VALUES
(1, 'Sary', 0, 1);

-- --------------------------------------------------------

--
-- Structure de la table `commentaires`
--

CREATE TABLE `commentaires` (
  `idCommentaire` int(11) NOT NULL,
  `contenu` text NOT NULL,
  `idMembre` int(11) NOT NULL,
  `idPublication` int(11) NOT NULL,
  `idComParent` int(11) DEFAULT NULL,
  `dateCommentaire` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `commentaires`
--

INSERT INTO `commentaires` (`idCommentaire`, `contenu`, `idMembre`, `idPublication`, `idComParent`, `dateCommentaire`) VALUES
(1, 'Tsara zn sary izany', 1, 1, NULL, '2021-05-13'),
(2, 'Ef mety', 1, 1, NULL, '2021-05-13'),
(3, 'Tsara kous ty le', 2, 1, NULL, '2021-05-14');

-- --------------------------------------------------------

--
-- Structure de la table `contenuscollection`
--

CREATE TABLE `contenuscollection` (
  `idPublication` int(11) NOT NULL,
  `idCollection` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `membres`
--

CREATE TABLE `membres` (
  `idMembre` int(11) NOT NULL,
  `nomUtilisateur` varchar(100) NOT NULL,
  `dateDeNaissance` date NOT NULL,
  `pays` varchar(255) NOT NULL,
  `sexe` enum('Homme','Femme') NOT NULL,
  `email` varchar(255) NOT NULL,
  `motDePasse` varchar(255) NOT NULL,
  `dateCreation` date NOT NULL,
  `lienPhoto` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `membres`
--

INSERT INTO `membres` (`idMembre`, `nomUtilisateur`, `dateDeNaissance`, `pays`, `sexe`, `email`, `motDePasse`, `dateCreation`, `lienPhoto`) VALUES
(1, 'Tino', '1998-03-12', 'Madagascar', 'Homme', 'tino@gmail.com', 'tino', '2021-08-25', './public/img/moka.jpeg'),
(2, 'Onfua', '1998-03-23', 'Madagascar', 'Homme', 'onfua@gmail.com', 'onfua', '2021-08-26', './public/uploads/avatars/pdp1.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `publications`
--

CREATE TABLE `publications` (
  `idPublication` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `lienImage` varchar(255) NOT NULL,
  `datePublication` datetime NOT NULL,
  `nombreVues` int(11) NOT NULL DEFAULT 0,
  `type` enum('Art','Post') NOT NULL DEFAULT 'Art',
  `idMembre` int(11) NOT NULL,
  `idTopic` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `publications`
--

INSERT INTO `publications` (`idPublication`, `titre`, `description`, `lienImage`, `datePublication`, `nombreVues`, `type`, `idMembre`, `idTopic`) VALUES
(1, 'Sary', 'Andrana', './public/uploads/posts/photo2.jpg', '2021-05-12 00:00:00', 1, 'Art', 1, 1),
(2, 'Oul mapme', 'Mafinaritra', './public/uploads/posts/photo.jpg', '2021-05-13 00:00:00', 1, 'Art', 1, 1),
(3, 'Test farany', 'fanandramana', './public/uploads/posts/photo3.jpg', '2021-05-14 00:00:00', 1, 'Art', 1, 1),
(4, 'photo4', 'test', './public/uploads/posts/photo4.jpg', '2021-05-15 00:00:00', 1, 'Art', 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `tags`
--

CREATE TABLE `tags` (
  `libelleTag` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `tagspublication`
--

CREATE TABLE `tagspublication` (
  `libelleTag` varchar(255) NOT NULL,
  `idPublication` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `topics`
--

CREATE TABLE `topics` (
  `idTopic` int(11) NOT NULL,
  `nomTopic` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `topics`
--

INSERT INTO `topics` (`idTopic`, `nomTopic`) VALUES
(1, 'test');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `collections`
--
ALTER TABLE `collections`
  ADD PRIMARY KEY (`idCollection`),
  ADD KEY `idMembre` (`idMembre`);

--
-- Index pour la table `commentaires`
--
ALTER TABLE `commentaires`
  ADD PRIMARY KEY (`idCommentaire`),
  ADD KEY `idMembre` (`idMembre`) USING BTREE,
  ADD KEY `idPublication` (`idPublication`) USING BTREE,
  ADD KEY `idComParent` (`idComParent`);

--
-- Index pour la table `contenuscollection`
--
ALTER TABLE `contenuscollection`
  ADD PRIMARY KEY (`idPublication`,`idCollection`),
  ADD KEY `idPublication` (`idPublication`),
  ADD KEY `idCollection` (`idCollection`);

--
-- Index pour la table `membres`
--
ALTER TABLE `membres`
  ADD PRIMARY KEY (`idMembre`);

--
-- Index pour la table `publications`
--
ALTER TABLE `publications`
  ADD PRIMARY KEY (`idPublication`),
  ADD KEY `idMembre` (`idMembre`),
  ADD KEY `idTopic` (`idTopic`);

--
-- Index pour la table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`libelleTag`);

--
-- Index pour la table `tagspublication`
--
ALTER TABLE `tagspublication`
  ADD PRIMARY KEY (`libelleTag`,`idPublication`),
  ADD KEY `fk_tagspub_idPublication` (`idPublication`);

--
-- Index pour la table `topics`
--
ALTER TABLE `topics`
  ADD PRIMARY KEY (`idTopic`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `collections`
--
ALTER TABLE `collections`
  MODIFY `idCollection` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `commentaires`
--
ALTER TABLE `commentaires`
  MODIFY `idCommentaire` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `membres`
--
ALTER TABLE `membres`
  MODIFY `idMembre` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `publications`
--
ALTER TABLE `publications`
  MODIFY `idPublication` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `topics`
--
ALTER TABLE `topics`
  MODIFY `idTopic` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `collections`
--
ALTER TABLE `collections`
  ADD CONSTRAINT `fk_collection_idMembre` FOREIGN KEY (`idMembre`) REFERENCES `membres` (`idMembre`);

--
-- Contraintes pour la table `commentaires`
--
ALTER TABLE `commentaires`
  ADD CONSTRAINT `fk_com_idMembre` FOREIGN KEY (`idMembre`) REFERENCES `membres` (`idMembre`),
  ADD CONSTRAINT `fk_com_idPublication` FOREIGN KEY (`idPublication`) REFERENCES `publications` (`idPublication`),
  ADD CONSTRAINT `fk_com_parent` FOREIGN KEY (`idComParent`) REFERENCES `commentaires` (`idCommentaire`);

--
-- Contraintes pour la table `contenuscollection`
--
ALTER TABLE `contenuscollection`
  ADD CONSTRAINT `fk_cc_idCollection` FOREIGN KEY (`idCollection`) REFERENCES `collections` (`idCollection`),
  ADD CONSTRAINT `fk_cc_idPublication` FOREIGN KEY (`idPublication`) REFERENCES `publications` (`idPublication`);

--
-- Contraintes pour la table `publications`
--
ALTER TABLE `publications`
  ADD CONSTRAINT `fk_pub_idMembre` FOREIGN KEY (`idMembre`) REFERENCES `membres` (`idMembre`),
  ADD CONSTRAINT `fk_pub_idTopic` FOREIGN KEY (`idTopic`) REFERENCES `topics` (`idTopic`);

--
-- Contraintes pour la table `tagspublication`
--
ALTER TABLE `tagspublication`
  ADD CONSTRAINT `fk_tagspub_idPublication` FOREIGN KEY (`idPublication`) REFERENCES `publications` (`idPublication`),
  ADD CONSTRAINT `fk_tagspub_tags` FOREIGN KEY (`libelleTag`) REFERENCES `tags` (`libelleTag`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
