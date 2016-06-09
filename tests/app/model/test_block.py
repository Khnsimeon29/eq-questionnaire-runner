from app.model.block import Block
from app.model.section import Section
import unittest
import json


class BlockModelTest(unittest.TestCase):
    def test_basics(self):
        block = Block()

        block.id = 'some-id'
        block.title = 'my block object'

        section1 = Section()
        section1.id = 'section-1'
        section2 = Section()
        section2.id = 'section-2'

        block.add_section(section1)
        block.add_section(section2)

        self.assertEquals(block.id, 'some-id')
        self.assertEquals(block.title, 'my block object')
        self.assertIsNone(block.container)
        self.assertEquals(len(block.sections), 2)
        self.assertEquals(block.sections[0], section1)
        self.assertEquals(block.sections[1], section2)

        self.assertEquals(section1.container, block)
        self.assertEquals(section2.container, block)

    def test_to_json(self):
        block = Block()

        block.id = 'some-id'
        block.title = 'my block object'

        section1 = Section()
        section1.id = 'section-1'
        section2 = Section()
        section2.id = 'section-2'

        block.add_section(section1)
        block.add_section(section2)

        json_str = json.dumps(block.to_json())
        json_obj = json.loads(json_str)

        self.assertEquals(json_obj['id'], 'some-id')
        self.assertEquals(json_obj['title'], 'my block object')
        self.assertEquals(len(json_obj['sections']), 2)

    def test_equivalence(self):
        block1 = Block()

        block1.id = 'some-id'
        block1.title = 'my block object'

        section1_1 = Section()
        section1_1.id = 'section-1'
        section1_2 = Section()
        section1_2.id = 'section-2'

        block1.add_section(section1_1)
        block1.add_section(section1_2)

        block2 = Block()

        block2.id = 'some-id'
        block2.title = 'my block object'

        section2_1 = Section()
        section2_1.id = 'section-1'
        section2_2 = Section()
        section2_2.id = 'section-2'

        block2.add_section(section2_1)
        block2.add_section(section2_2)

        self.assertEquals(block1, block2)
        self.assertEquals(block2, block1)

        block1.id = 'a different id'

        self.assertNotEquals(block1, block2)
        self.assertNotEquals(block2, block1)

        block1.id = 'some-id'

        self.assertEquals(block1, block2)
        self.assertEquals(block2, block1)

    def test_hashing(self):
        block1 = Block()

        block1.id = 'some-id'
        block1.title = 'my block object'

        block2 = Block()

        block2.id = 'some-id'
        block2.title = 'my block object'

        block_list = []

        block_list.append(block1)

        # Both objects areequivalent, so both appear to be in the list
        self.assertIn(block1, block_list)
        self.assertIn(block2, block_list)
        self.assertEquals(len(block_list), 1)

        block_list.append(block2)

        # Now they both are, but they are equivalent
        self.assertEquals(len(block_list), 2)

        block_set = set()

        block_set.add(block1)

        self.assertIn(block1, block_set)
        self.assertEquals(len(block_set), 1)

        block_set.add(block2)

        self.assertEquals(len(block_set), 1)
        self.assertIn(block1, block_set)
        self.assertIn(block2, block_set)

        block2.id = 'another-id'

        self.assertNotEquals(block1, block2)

        block_set.add(block2)

        self.assertEquals(len(block_set), 2)
        self.assertIn(block1, block_set)
        self.assertIn(block2, block_set)
