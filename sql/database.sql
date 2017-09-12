--
-- Table structure for table `br_a`
--

CREATE TABLE IF NOT EXISTS `br_a` (
`id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `a` int(11) NOT NULL,
  `b` int(11) NOT NULL,
  `when` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=1151 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;

ALTER TABLE `br_a`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `USER_GAME` (`user_id`,`game_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `br_a`
--
ALTER TABLE `br_a`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1151;

--
-- Table structure for table `br_c`
--

CREATE TABLE IF NOT EXISTS `br_c` (
`id` int(11) NOT NULL,
  `when` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name` text COLLATE latin1_general_cs NOT NULL,
  `mail` text COLLATE latin1_general_cs NOT NULL,
  `phone` text COLLATE latin1_general_cs NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;

ALTER TABLE `br_c`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `br_c`
--
ALTER TABLE `br_c`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=22;

--
-- Table structure for table `br_g`
--

CREATE TABLE IF NOT EXISTS `br_g` (
`id` int(11) NOT NULL,
  `name` text COLLATE latin1_general_cs NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=191 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;

--
-- Indexes for table `br_g`
--
ALTER TABLE `br_g`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `br_g`
--
ALTER TABLE `br_g`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=191;

--
-- Table structure for table `br_s`
--

CREATE TABLE IF NOT EXISTS `br_s` (
`id` int(11) NOT NULL,
  `a` int(11) NOT NULL,
  `b` int(11) NOT NULL,
  `when` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;


--
-- Indexes for table `br_s`
--
ALTER TABLE `br_s`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `br_s`
--
ALTER TABLE `br_s`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=41;

--
-- Table structure for table `br_u`
--

CREATE TABLE IF NOT EXISTS `br_u` (
`id` int(11) NOT NULL,
  `name` text COLLATE latin1_general_cs NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;

--
-- Indexes for table `br_u`
--
ALTER TABLE `br_u`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `name` (`name`(11));

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `br_u`
--
ALTER TABLE `br_u`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=34;

-- auxiliary table for br_chart
create view br_v0 as 
select name, if(br_a.a > br_a.b,1,if(br_a.a < br_a.b,-1,0)) = if(br_s.a > br_s.b,1,if(br_s.a < br_s.b,-1,0)) as r_r, (br_a.a=br_s.a) * 1 + (br_a.b=br_s.b) * 1 as r_p, CEIL(br_a.game_id / 10) as round from br_u,br_a,br_s where br_u.id = br_a.user_id and br_a.game_id = br_s.id and br_s.a != -1

-- score ranking
create view br_ranking as
SELECT name,sum(points) as total_points ,sum(scores) as total_scores, max(points) as best_round FROM br_chart group by name order by total_points desc, total_scores desc, best_round desc

-- official scores report
create view br_scores as 
select br_g.id, ceiling((br_g.id/10)) AS round, br_g.name, br_s.a, br_s.b from br_g join br_s where br_g.id = br_s.id

-- auxiliary view for br_missing
create view br_v1 as 
select name,count(game_id) as bets from br_u,br_a where br_u.id = br_a.user_id group by name

-- auxiliary view for br_missing
create view br_v2 as 
select count(id) as bets from br_s;

-- user that did not make a bet this round
create view br_missing as 
select name from br_v1,br_v2 where br_v1.bets <= br_v2.bets;

-- chart data
create view br_chart as 
select name,round,sum(r_r) as scores,sum(if(r_p=2,10,if(r_p=1,if(r_r,7,3),r_r * 5))) as points from br_v0 group by name,round order by round


-- approve
create view br_v3 as
SELECT t0.* FROM br_c as t0 left join br_u as t1 on t0.name = t1.name where t1.name is NULL

