package com.skilldistillery.workout.repositories;

import static org.junit.Assert.assertEquals;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
class RepositoryTests {
	@Autowired
	WorkoutRepository repo;

	@Test
	void test() {
		assertEquals(4, repo.findAll().size());
	}
}
